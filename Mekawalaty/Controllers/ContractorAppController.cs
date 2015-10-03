using DataServices.Repository;
using Interface.IDataService;
using Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web; 
using System.Net.Http;
using System.Web.Http;
using System.Web.Hosting;
using System.Web.Routing;
using System.Web.UI.WebControls;
using InterfaceI.DataService;
using DataContext.DBModel;
using DataModel.SecurityModel;

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

        private readonly IFinancialcustodyRepository _finacialCustody;
        private readonly IInventoryprojectreleaseRepository _inventoryprojectrelease;
        private readonly IInventoryRepository _inventory;
        private readonly IInvoicesitemsRepository _invoiceItem;
        private readonly IInvoicesRepository _invoice;
        private readonly ILoansItemsRepository _loanItems;
        private readonly ILoansRepository _loans;
        private readonly IProjectItemsRepository _projectItems;
        private readonly IUsersRepository _userRepository;
        public ContractorAppController(AccountantsRepository accountant,
            CarRepository car,
            ChequesRepository cheaque,
            CompaniesRepository companies,
            ContactsLoanRepository contactLoans,
            ExpensesRepository expenses,
            ExpensesTypes expensesTypes,

           FinancialcustodyRepository finacialCustody,
           InventoryprojectreleaseRepository inventoryprojectrelease,
           InventoryRepository inventory,
           InvoicesitemsRepository invoiceItem,
           InvoicesRepository invoice,
           LoansItemsRepository loanItems,
           LoansRepository loans,
           ProjectItemsRepository projectItems,
            UsersRepository userRepository
            )
        {
            _userRepository = userRepository;
            _accountant = accountant;
            _car = car;
            _cheaque = cheaque;
            _companies = companies;
            _contactLoans = contactLoans;
            _expenses = expenses;
            _expensesTypes = expensesTypes;

            _finacialCustody = finacialCustody;
            _inventoryprojectrelease = inventoryprojectrelease;
            _inventory = inventory;
            _invoiceItem = invoiceItem;
            _invoice = invoice;
            _loanItems = loanItems;
            _loans = loans;
            _projectItems = projectItems;
        }


        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login([FromBody] DataModel.SecurityModel.Login _user)
        {
            const string errorMessage = "Invalid User Name / Password";

            var response = new HttpResponseMessage();

            users user = _userRepository.FindBy(x => x.userName == _user.userName).SingleOrDefault();

            if (user != null)
            {
                if (user.userPassword == _user.userPassword)
                {
                    string secret = TokenManager.Base64Encode(SecurityConstants.KeyForHmacSha256);

                    var currentTime =
                        (long)(DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0, 0).ToLocalTime()).TotalSeconds;

                    var payload = new JwtPayload
                    {
                        iss = SecurityConstants.TokenIssuer,
                        sub = user.id.ToString(), 
                        iat = currentTime,
                        exp = currentTime + 604800 
                    };

                    string jwt = TokenManager.EncodeToken(payload, secret);

                    response.StatusCode = HttpStatusCode.OK;
                    response.Headers.Add("Authorization", jwt);

                    return ResponseMessage(response);
                }
            }

            response.StatusCode = HttpStatusCode.Unauthorized;
            response.ReasonPhrase = errorMessage;

            return ResponseMessage(response);
        }


        [AuthorizeUser]
        [HttpGet]
        [Route("CheckTokenValidity")]
        public IHttpActionResult CheckTokenValidity()
        {
            var currentUrl = HttpContext.Current.Request.Url.Host;

            //var primeData = _accountRepository.GetUserPrimeData(_userType, _groupId, _accountOwnerId, _accountId, currentUrl);

            return Ok();
        }
    }
}