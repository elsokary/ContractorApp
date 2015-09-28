using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using Interface.IDataService;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IFinancialcustodyRepository : IGenericRepository<financialCustody>
    {
        List<DtoFinancialcustody> selectAll( );
        DtoSettlements getSettlementsByAccountant(int accountantId);
        List<DtoFinancialcustody> selectAllBySettlement(int accountantId);

        DtoFinancialcustody selectById(int id, string lang);



    }
    public class DtoSettlements
    {
        public double? total { get; set; }
        public double? expenses { get; set; }
        public double? balance { get; set; }
        public DateTime? startDate { get; set; }
    }
}

