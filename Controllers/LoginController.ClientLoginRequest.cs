namespace webwallet.Controllers
{
    public partial class LoginController
    {
        public class ClientLoginRequest
        {
            public ClientLoginRequest()
            {
            }

            public string client_id { get; set; }
            public string client_secret { get; set; }
            public string grant_type { get; set; }
            public string password { get; set; }
            public string responseRecaptcha { get; set; }
            public string twoFactorAuthentication { get; set; }
            public string username { get; set; }
        }

        public class ClientResetPasswordRequest : ClientLoginRequest
        {
            public string recoveryKey { get; set; }
        }
    }
}