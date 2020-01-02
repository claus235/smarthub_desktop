using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace webwallet
{
    public class Program
    {
        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
.UseApplicationInsights()
.UseStartup<Startup>()
.Build();
        }

        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }
    }
}