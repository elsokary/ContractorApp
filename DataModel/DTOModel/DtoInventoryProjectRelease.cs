using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoInventoryprojectrelease
    {
        public int id
        {
            get;
            set;
        }

        public int? inventoryItemId
        {
            get;
            set;
        }

        public string description
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

        public double? quantity
        {
            get;
            set;
        }
    }

}

