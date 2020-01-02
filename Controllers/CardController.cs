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
    public partial class CardController : Controller
    {
        private readonly IConfiguration _config;

        public CardController(IConfiguration configuration)
        {
            this._config = configuration;
        }

        [HttpPost("[action]")]
        public async Task<dynamic> AndroidCard([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/card/Android", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public FileResult AppleCard([FromBody] dynamic request)
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
                    var response = httpClient.PostAsync(this._config["AppApiDomain"] + "/api/card/Apple", content);
                    var pass = response.Result.Content.ReadAsByteArrayAsync().Result;

                    return this.File(pass, "application/vnd.apple.pkpass");
                }
            }
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/card/CreateCard", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpDelete("[action]/{id}")]
        public async Task<dynamic> Delete(string id)
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

                    var response = await httpClient.DeleteAsync(this._config["AppApiDomain"] + "/api/card/" + id);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to delete card => " + ex.Message);
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<dynamic> GetCard(string id)
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/card/" + id.ToString());
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to delete card => " + ex.Message);
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<dynamic> GetTransactions(string id)
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/card/" + id.ToString() + "/transactions");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get transactions => " + ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> QrCode([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/card/QrCode", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPut("[action]/{id}")]
        public async Task<dynamic> Update([FromBody] dynamic request, string id)
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
                    var response = await httpClient.PutAsync(this._config["AppApiDomain"] + "/api/card/" + id, content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }
    }
}