using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace webwallet.Controllers
{
    [Route("api/[controller]")]
    public partial class NotificationsController : Controller
    {
        private readonly IConfiguration _config;

        public NotificationsController(IConfiguration configuration)
        {
            this._config = configuration;
        }

        [HttpGet("[action]")]
        public async Task<dynamic> My()
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    StringValues auth;
                    this.Request.Headers.TryGetValue("Authorization", out auth);
                    var authHeader = auth.FirstOrDefault();
                    if (!string.IsNullOrEmpty(authHeader))
                        authHeader = authHeader.Replace("Bearer ", "");
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authHeader);

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/notification/getnotifications");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get My => " + ex.Message);
            }
        }
    }
}