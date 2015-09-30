﻿using DataServices.Repository;
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

namespace Mekawalaty.Controllers
{
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