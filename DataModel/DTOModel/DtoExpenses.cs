using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoExpenses
    {
        public int id
        {
            get;
            set;
        }

        public string accountName { get; set; }
        public bool editable { get; set; }
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

        public int? expenseTypeId
        {
            get;
            set;
        }

        public string expenseTypeName
        {
            get;
            set;
        }

        public string description
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

        public double? total
        {
            get;
            set;
        }

        public DateTime? expenseDate
        {
            get;
            set;
        }
    }

}

