using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoAccounters
    {
        public int id
        {
            get;
            set;
        }

        public string fullname
        {
            get;
            set;
        }

        public double? totalFinancialCustody { get; set; }
        public string address
        {
            get;
            set;
        }

        public string phone
        {
            get;
            set;
        }

        public string projectName { get; set; }
        public string socialCardNumber
        {
            get;
            set;
        }

        public string email
        {
            get;
            set;
        }
    }

}

