using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace webwallet
{
    public static class Recaptcha
    {
        public static bool IsValid(string response, IHostingEnvironment env, IConfiguration _config)
        {
            if (env.IsDevelopment()) return true;
            if (string.IsNullOrEmpty(response)) return false;

            var retorno = true;
            var reCAPTCHA_SecretKey = _config["RecaptchaSecretKey"];
            var urlPost = "https://www.google.com/recaptcha/api/siteverify";

            using (var client = new WebClient())
            {
                var reqparm = new System.Collections.Specialized.NameValueCollection();
                reqparm.Add("secret", reCAPTCHA_SecretKey);
                reqparm.Add("response", response);
                var responsebytes = client.UploadValues(urlPost, "POST", reqparm);
                var responsebody = Encoding.UTF8.GetString(responsebytes);

                dynamic json = JsonConvert.DeserializeObject(responsebody);

                if (json.success == true)
                    retorno = true;
                else
                    retorno = false;
            }

            return retorno;
        }
    }
}