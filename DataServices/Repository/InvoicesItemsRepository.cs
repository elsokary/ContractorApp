 
using Interface.IDataService;
using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;
using InterfaceI.DataService;



namespace DataServices.Repository
{
    public class InvoicesitemsRepository : GenericRepository<SharktyContext, invoicesItems>, IInvoicesitemsRepository
    {

        public List<DtoInvoicesitems> selectAll(int invoiceId)
        {
            var list = new List<DtoInvoicesitems>();

            list = (from q in Context.invoicesItems
                    where q.invoiceId == invoiceId
                    select new DtoInvoicesitems
                    {
                        id = q.id,
                        invoiceId = q.invoiceId,
                        description = q.description,
                        unit = q.unit,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        perviousQuantity = q.perviousQuantity,
                        totalQauntity = q.totalQauntity,
                        total = q.total,
                    }).ToList();
            return list;
        }

        public DtoInvoicesitems selectById(int id, string lang)
        {
            var list = new DtoInvoicesitems();
            if (lang == "en")
            {
                list = (from q in Context.invoicesItems
                        where q.id == id
                        select new DtoInvoicesitems
                        {
                            invoiceId = q.invoiceId,
                            description = q.description,
                            unit = q.unit,
                            quantity = q.quantity,
                            unitPrice = q.unitPrice,
                            perviousQuantity = q.perviousQuantity,
                            totalQauntity = q.totalQauntity,
                            total = q.total,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.invoicesItems
                        where q.id == id
                        select new DtoInvoicesitems
                        {
                            invoiceId = q.invoiceId,
                            description = q.description,
                            unit = q.unit,
                            quantity = q.quantity,
                            unitPrice = q.unitPrice,
                            perviousQuantity = q.perviousQuantity,
                            totalQauntity = q.totalQauntity,
                            total = q.total,
                        }).FirstOrDefault();
            } return list;
        }

        public List<DtoInvoicesitems> selectForNewInvoice(int projectId)
        {
            var list = new List<DtoInvoicesitems>();

            var invoiceId = (from q in Context.invoices
                             where q.projectId == projectId
                             select q.id).SingleOrDefault();
            if (invoiceId == 0)
            {
                list = (from q in Context.projectItems
                        select new DtoInvoicesitems
                        {
                            id = q.id,
                            itemId = q.id,
                            arrange = q.arrange,
                            invoiceId = 0,
                            description = q.description,
                            unit = q.unit,
                            quantity = 0,
                            unitPrice = q.unitPrice,
                            perviousQuantity = 0,
                            totalQauntity = 0,
                            total = 0,

                        }).ToList();
            }
            else
            {
                list = (from q in Context.projectItems
                        join i in Context.invoicesItems on q.id equals i.itemId
                        where i.invoiceId == invoiceId
                        select new DtoInvoicesitems
                        {
                            id = q.id,
                            itemId = q.id,
                            arrange = q.arrange,
                            invoiceId = i.invoiceId,
                            description = q.description,
                            unit = q.unit,
                            quantity = 0,
                            unitPrice = q.unitPrice,
                            perviousQuantity = i.totalQauntity,
                            totalQauntity = i.totalQauntity,
                            total = i.totalQauntity * q.unitPrice,
                        }).ToList();
            }


            return list;
        }

        public List<DtoInvoicesitems> selectForEditInvoice(int invoiceId)
        {
            var list = new List<DtoInvoicesitems>();

            list = (from q in Context.projectItems
                    join i in Context.invoicesItems on q.id equals i.itemId
                    where i.invoiceId == invoiceId
                    select new DtoInvoicesitems
                    {
                        id = i.id,
                        itemId = q.id,
                        arrange = q.arrange,
                        invoiceId = i.invoiceId,
                        description = q.description,
                        unit = q.unit,
                        quantity = i.quantity,
                        unitPrice = q.unitPrice,
                        perviousQuantity = i.perviousQuantity,
                        totalQauntity = i.totalQauntity,
                        total = i.totalQauntity * q.unitPrice,
                    }).ToList();
            return list;
        }
        public double? selectTotal(int invoiceId)
        {

            var list = (from q in Context.projectItems
                        join i in Context.invoicesItems on q.id equals i.itemId
                        where i.invoiceId == invoiceId
                        select new DtoInvoicesitems
                        {
                            id = i.id,
                            itemId = q.id,
                            arrange = q.arrange,
                            invoiceId = i.invoiceId,
                            description = q.description,
                            unit = q.unit,
                            quantity = i.quantity,
                            unitPrice = q.unitPrice,
                            perviousQuantity = i.perviousQuantity,
                            totalQauntity = i.totalQauntity,
                            total = i.totalQauntity * q.unitPrice,
                        }).ToList().Sum(x => x.total);


            return list;
        }


    }
}

