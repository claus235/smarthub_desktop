using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace webwallet.Controllers
{
    public class HomeController : Controller
    {
        public ContentResult AppleAppSiteAssociation()
        {
            var text = @"
{
  ""webcredentials"": {
    ""apps"": [""WTK3694554.cc.smartcash.wallet""]
    }
}";

            return this.Content(text, "application/json");
        }

        public IActionResult Error()
        {
            this.ViewData["RequestId"] = Activity.Current?.Id ?? this.HttpContext.TraceIdentifier;
            return this.View();
        }

        public IActionResult Index()
        {
            return this.View();
        }
    }
}