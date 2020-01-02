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
    public partial class SmartShiftController : Controller
    {
        private readonly IConfiguration _config;

        public SmartShiftController(IConfiguration configuration)
        {
            this._config = configuration;
        }

        [HttpDelete("[action]/{transactionId}")]
        public async Task<dynamic> Cancel(string transactionId)
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

                    var response = await httpClient.DeleteAsync(this._config["AppApiDomain"] + "/api/externaldeposit/cancel/" + transactionId.ToString());
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get MyTransactions => " + ex.Message);
            }
        }

        [HttpPost("[action]/{transactionID}")]
        public async Task<dynamic> Confirm([FromBody] dynamic request, string transactionID)
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

                    var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/externaldeposit/confirm/" + transactionID.ToString(), content);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get Confirm => " + ex.Message);
            }
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/externaldeposit/currencies");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the Currencies  =>  " + ex.Message);
            }
        }

        [HttpPost("donation/cancel/{transactionId}")]
        public async Task<dynamic> DonationCancel([FromBody] dynamic request, string transactionId)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var req = new HttpRequestMessage
                    {
                        Method = HttpMethod.Delete,
                        RequestUri = new Uri(this._config["AppApiDomain"] + "/api/externaldonation/cancel/" + transactionId.ToString()),
                        Content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json")
                    };
                    var response = await httpClient.SendAsync(req);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get MyTransactions => " + ex.Message);
            }
        }

        [HttpPost("donation/confirm/{transactionId}")]
        public async Task<dynamic> DonationConfirm([FromBody] dynamic request, string transactionId)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/externaldonation/confirm/" + transactionId.ToString(), content);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get DonationConfirm => " + ex.Message);
            }
        }

        [HttpGet("donation/currencies")]
        public async Task<dynamic> DonationCurrencies()
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/externaldonation/Currencies");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get DonationCurrencies => " + ex.Message);
            }
        }

        [HttpPost("donation/donate/{addressType}")]
        public async Task<dynamic> DonationDonate([FromBody] dynamic request, string addressType)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/externaldonation/donate/" + addressType.ToString(), content);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get DonationDonate => " + ex.Message);
            }
        }

        [HttpPost("donation/mytransactions")]
        public async Task<dynamic> DonationMyTransactions([FromBody] dynamic request)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var content = new StringContent(JsonConvert.SerializeObject(request), System.Text.Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/externaldonation/my", content);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get DonationMyTransactions => " + ex.Message);
            }
        }

        [HttpGet("[action]/{addressType}")]
        public async Task<dynamic> GetAddress(string addressType)
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/externaldeposit/externaldepositaddress/" + addressType.ToString());
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get GetAddress => " + ex.Message);
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/externaldeposit/my");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get MyTransactions => " + ex.Message);
            }
        }

        [HttpGet("[action]")]
        public async Task<dynamic> Terms()
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/externaldeposit/terms");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get DonationCurrencies => " + ex.Message);
            }
        }
    }
}