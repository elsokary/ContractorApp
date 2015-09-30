using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Ninject;
using Ninject.Web.Common;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;

using Mekawalaty;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace Mekawalaty
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var policy = new CorsPolicy
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                SupportsCredentials = true,
                AllowAnyOrigin = true
            };

            policy.ExposedHeaders.Add("Authorization");

            app.UseCors(new CorsOptions
            {
                PolicyProvider = new CorsPolicyProvider
                {
                    PolicyResolver = context => Task.FromResult(policy)
                }
            });

            var config = new HttpConfiguration();

            WebApiConfig.Register(config);
            //app.UseNinjectMiddleware(CreateKernel).UseNinjectWebApi(config);
            app.UseNinjectMiddleware(CreateKernel);
            app.UseNinjectWebApi(config);

        }

        private static StandardKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());

            //  kernel.Bind<IHrTransactionDailyRepository>().To<HrTransactionDailyRepository>().InRequestScope();

            return kernel;
        }
    }
}
