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
    public partial class ChangellyController : Controller
    {
        private readonly IConfiguration _config;

        public ChangellyController(IConfiguration configuration)
        {
            this._config = configuration;
        }

        [HttpGet("[action]")]
        public async Task<dynamic> Currencies()
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/changelly/currenciesfull");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the currencies  =>  " + ex.Message);
            }
        }

        [HttpDelete("[action]/{id}")]
        public async Task<dynamic> DeleteTransaction(string id)
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

                    var response = await httpClient.DeleteAsync(this._config["AppApiDomain"] + "/api/changelly/" + id.ToString());
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get MyTransactions => " + ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> ExchangeAmount([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/changelly/ExchangeAmount", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<dynamic> GetTransaction(string id)
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/changelly/Transaction/" + id.ToString());
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get Transaction => " + ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> MinAmount([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/changelly/MinAmount", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpGet("[action]")]
        public async Task<dynamic> MyTransactions()
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/changelly/My");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get MyTransactions => " + ex.Message);
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<dynamic> Status(string id)
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/changelly/Status/" + id.ToString());
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get Transaction => " + ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> Transaction([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/changelly/CreateTransaction", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }
    }
}