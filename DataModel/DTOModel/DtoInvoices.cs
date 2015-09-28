using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoInvoices
    {
        public int id
        {
            get;
            set;
        }

        public int? projectId
        {
            get;
            set;
        }

        public string projectName
        {
            get;
            set;
        }

        public int? invoiceNumber
        {
            get;
            set;
        }

        public DateTime? invoicesDate
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }

        public double? insurancePercent
        {
            get;
            set;
        }

        public double? insuranceValue
        {
            get;
            set;
        }

        public bool editable
        {
            get;
            set;
        }

    }

}

