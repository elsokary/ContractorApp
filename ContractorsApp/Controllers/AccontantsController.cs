using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataContext.DBModel;
using DataServices.Repository;
using Interface.IDataService;
using Newtonsoft.Json;

namespace ContractorsApp.Controllers
{
    public class AccontantsController : Controller
    {
        private readonly IAccountantsRepository _accountant;

        public AccontantsController()
        {
            _accountant = new AccountantsRepository();

        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            return PartialView("GetAll");
        }

        [HttpGet]
        public JsonResult GetAllRecords()
        {
            var result = _accountant.getfinancialCustody();

            var JsonObject = JsonConvert.SerializeObject(result, Formatting.Indented);

            return Json(JsonObject, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
