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
    public partial class VaultController : Controller
    {
        private readonly IConfiguration _config;

        public VaultController(IConfiguration configuration)
        {
            this._config = configuration;
        }

        [HttpPost("[action]")]
        public async Task<dynamic> Create([FromBody] dynamic request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            using (var httpClient = new HttpClient())
            {
                StringValues auth;
                this.Request.Headers.TryGetValue("Authorization", out auth);
                var authHeader = auth.FirstOrDefault();
                if (!string.IsNullOrEmpty(authHeader))
                    authHeader = authHeader.Replace("Bearer ", "");
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.FirstOrDefault().Replace("Bearer ", ""));

                using (var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json"))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/vault/createvault", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpGet("[action]")]
        public async Task<dynamic> Get()
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/vault/getvault");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the currencies  =>  " + ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> Update([FromBody] dynamic request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            using (var httpClient = new HttpClient())
            {
                StringValues auth;
                this.Request.Headers.TryGetValue("Authorization", out auth);
                var authHeader = auth.FirstOrDefault();
                if (!string.IsNullOrEmpty(authHeader))
                    authHeader = authHeader.Replace("Bearer ", "");
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.FirstOrDefault().Replace("Bearer ", ""));

                using (var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json"))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/vault/updatevault", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> WithDraw([FromBody] dynamic request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            using (var httpClient = new HttpClient())
            {
                StringValues auth;
                this.Request.Headers.TryGetValue("Authorization", out auth);
                var authHeader = auth.FirstOrDefault();
                if (!string.IsNullOrEmpty(authHeader))
                    authHeader = authHeader.Replace("Bearer ", "");
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.FirstOrDefault().Replace("Bearer ", ""));

                using (var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json"))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/vault/withdrawalvault", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }
    }
}