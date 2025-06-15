using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace checkExamResult.Server.Model
{
	public class ExamForm 
	{
		
		public int id { get; set; }
		public int RollNo { get; set; }


		public int Subcentercode { get; set; }



		public int SubjectCode { get; set; }


		public string? UserName { get; set; }

		public string? Date { get; set; }


		public int? AB1 { get; set; }


		public int? AB2 { get; set; }


		public int? AB3 { get; set; }


		public string? HandwritingMatching { get; set; }

		public string? Remarks { get; set; }


		public string? Remarks1 { get; set; }


		public string? Remarks2 { get; set; }

		public string? Remarks3 { get; set; }

		public string? Remarks4 { get; set; }

		public string? Barcode { get; set; } = string.Empty;


		public string? medium { get; set; }

		public string? createuser { get; set; }

		public DateTime? createdate { get; set; }

		public int? TotalCount { get; set; }

		public string? modifyuser { get; set; }

		public DateTime? modifydate { get; set; }

	
		public string? status { get; set; }


		public string? StatusRemarks { get; set; }

	
		//public string SubcentreName { get; set; } = string.Empty;

	
		//public string SubjectName { get; set; } = string.Empty;

		//public int AbCountEc2 { get; set; }

		//public int ActualAbCount { get; set; }

		
		//public int Difference { get; set; }

		
		//public string CentreName { get; set; } = string.Empty;

	
		//public int TotalAbMentioned { get; set; }

		
		//public int TotalAbAttached { get; set; }

		
		//public int TotalAbEc5 { get; set; }

		
		//public string? StudentError { get; set; }

		
		//public string? CenterError { get; set; }

	
		//public string? OtherError { get; set; }


		//public string? ExtraManualCase { get; set; }
	}
}
