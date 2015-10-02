using DataServices.Repository;
using Interface.IDataService;
using Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
//using System.Web.Http.Cors;
using System.Net.Http;
using System.Web.Http;
using System.Web.Hosting;
using System.Web.Routing;
using System.Web.UI.WebControls; 

namespace Mekawalaty.Controllers
{
    [RoutePrefix("api/ContractorApp")]
    public class ContractorAppController : ApiController
    {
        
        private readonly IAccountantsRepository _accountant;
        private readonly ICarRepository _car;
        private readonly IChequesRepository _cheaque;
        private readonly ICompaniesRepository _companies;
        private readonly IContactsLoanRepository _contactLoans;
        private readonly IExpensesRepository _expenses;
        private readonly IExpensesTypes _expensesTypes;

        public ContractorAppController(AccountantsRepository accountant,
            CarRepository car,
            ChequesRepository cheaque,
            CompaniesRepository companies,
            ContactsLoanRepository contactLoans,
            ExpensesRepository expenses,
            ExpensesTypes expensesTypes
            )
        {
            _accountant = accountant;
            _car = car;
            _cheaque = cheaque;
            _companies = companies;
            _contactLoans = contactLoans;
            _expenses = expenses;
            _expensesTypes = expensesTypes;

        }


        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login([FromBody] Login _user)
        {
            const string errorMessage = "Invalid User Name / Password";

            var response = new HttpResponseMessage();

            //account user = _accountRepository.FindBy(x => x.userName == _user.userName).SingleOrDefault();

            //if (user != null)
            //{
            //    if (user.userPassword == _user.userPassword)
            //    {
            //        string secret = TokenManager.Base64Encode(SecurityConstants.KeyForHmacSha256);

            //        var currentTime =
            //            (long)(DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0, 0).ToLocalTime()).TotalSeconds;

            //        var payload = new JwtPayload
            //        {
            //            iss = SecurityConstants.TokenIssuer,
            //            sub = user.id.ToString(),
            //            aoi = user.accountOwnerId.ToString(),
            //            iat = currentTime,
            //            exp = currentTime + 604800,
            //            uty = user.userType,
            //            gri = user.groupId.ToString()
            //        };

            //        string jwt = TokenManager.EncodeToken(payload, secret);

            //        response.StatusCode = HttpStatusCode.OK;
            //        response.Headers.Add("Authorization", jwt);

            //        return ResponseMessage(response);
            //    }
            //}

            //response.StatusCode = HttpStatusCode.Unauthorized;
            //response.ReasonPhrase = errorMessage;

            return ResponseMessage(response);
        }


        [AuthorizeUser]
        [HttpGet]
        [Route("CheckTokenValidity")]
        public IHttpActionResult CheckTokenValidity()
        {
            //var currentUrl = HttpContext.Current.Request.Url.Host;

            //var primeData = _accountRepository.GetUserPrimeData(_userType, _groupId, _accountOwnerId, _accountId, currentUrl);

            return Ok();
        }
    }
}