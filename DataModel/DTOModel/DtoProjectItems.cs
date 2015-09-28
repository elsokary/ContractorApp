using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoProjectItems
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

        public int? arrange
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


        public double? unitPrice
        {
            get;
            set;
        }

    }

}

