using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoWorkers
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
        public int? workerId
        {
            get;
            set;
        }

        public string fullname
        {
            get;
            set;
        }

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

        public string socialCardNumber
        {
            get;
            set;
        }

        public double? daySalary
        {
            get;
            set;
        }

        public int workerTypeId
        {
            get;
            set;
        }

        public string workerTypeName
        {
            get;
            set;
        }
    }

}

