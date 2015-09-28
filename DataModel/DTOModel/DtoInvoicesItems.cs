using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoInvoicesitems
    {
        public int id
        {
            get;
            set;
        }

        public int? invoiceId
        {
            get;
            set;
        }
        public int? arrange
        {
            get;
            set;
        }
        public int? itemId
        {
            get;
            set;
        }

        public string invoiceName
        {
            get;
            set;
        }

        public string description
        {
            get;
            set;
        }

        public string unit
        {
            get;
            set;
        }

        public double? quantity
        {
            get;
            set;
        }

        public double? unitPrice
        {
            get;
            set;
        }

        public double? perviousQuantity
        {
            get;
            set;
        }

        public double? totalQauntity
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }
    }

}

