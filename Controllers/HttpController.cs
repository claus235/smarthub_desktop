using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace webwallet.Controllers
{
    [Route("api/[controller]")]
    public partial class HttpController : Controller
    {
        [HttpGet("[action]")]
        public async Task<dynamic> GetJson(string url)
        {
            using (var httpClient = new HttpClient())
            {
                StringValues auth;
                this.Request.Headers.TryGetValue("Authorization", out auth);
                var authHeader = auth.FirstOrDefault();
                if (!string.IsNullOrEmpty(authHeader))
                    authHeader = authHeader.Replace("Bearer ", "");
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.FirstOrDefault().Replace("Bearer ", ""));

                var response = await httpClient.GetAsync(url);
                return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> PostFormUrlEncodedContent([FromBody] dynamic request, string url, List<KeyValuePair<string, string>> postData)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            using (var httpClient = new HttpClient())
            {
                using (var content = new FormUrlEncodedContent(postData))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
                    var response = await httpClient.PostAsync(url, content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> PostJson([FromBody] dynamic request, string url)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            using (var httpClient = new HttpClient())
            {
                using (var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json"))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/json");
                    var response = await httpClient.PostAsync(url, content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }
    }
}