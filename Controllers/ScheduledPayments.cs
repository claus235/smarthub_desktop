using Microsoft.AspNetCore.Hosting;
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
    public partial class ScheduledPaymentsController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _env;

        public ScheduledPaymentsController(IConfiguration configuration, IHostingEnvironment env)
        {
            this._config = configuration;
            this._env = env;
        }

        [HttpPost("[action]")]
        public async Task<dynamic> CancelMailScheduled([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/cancelemailscheduledpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> CancelRecurring([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/cancelrecurringpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> CancelScheduled([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/cancelscheduledpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> ConfigureScheduled([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/configurescheduledpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> CreateRecurring([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/createrecurringpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> CreateScheduled([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/createscheduledpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }

        [HttpGet("[action]")]
        public async Task<dynamic> GetRecurrenceTypes()
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/getrecurrencetypes");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the recurrence types  =>  " + ex.Message);
            }
        }

        [HttpGet("[action]")]
        public async Task<dynamic> GetRecurring()
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/getlistrecurringpayment");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the recurring payment  =>  " + ex.Message);
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<dynamic> GetScheduled(string id)
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/getscheduledpayment?id=" + id);
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the scheduled payment  =>  " + ex.Message);
            }
        }

        [HttpGet("[action]")]
        public async Task<dynamic> GetScheduledList()
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

                    var response = await httpClient.GetAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/getlistscheduledpayment");
                    return JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error to get the scheduled payment  =>  " + ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> Send([FromBody] dynamic request)
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
                    var response = await httpClient.PostAsync(this._config["AppApiDomain"] + "/api/scheduledpayments/sendscheduledpayment", content);
                    dynamic token = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    return token;
                }
            }
        }
    }
}