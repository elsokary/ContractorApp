//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataContext.DBModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class cars
    {
        public int id { get; set; }
        public string carNumber { get; set; }
        public string carModel { get; set; }
        public Nullable<System.DateTime> licenseDate { get; set; }
    }
}
