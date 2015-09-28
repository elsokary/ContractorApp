using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoLoans
    {
        public int id
        {
            get;
            set;
        }

        public string fullName
        {
            get;
            set;
        }

        public DateTime? loanDate
        {
            get;
            set;
        }

        public double? loanValue
        {
            get;
            set;
        }

        public double? payed
        {
            get;
            set;
        }

        public double? balance
        {
            get;
            set;
        }

        public string contactName { get; set; }
        public DateTime? dueDate
        {
            get;
            set;
        }

        public string notes
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
    }

}

