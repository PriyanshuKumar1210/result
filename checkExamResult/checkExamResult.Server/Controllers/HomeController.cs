using Microsoft.AspNetCore.Mvc;

using System.Xml;
using System.Text.Json;
using checkExamResult.Server.App_Data;
using System.Data;
using Microsoft.Data.SqlClient;
//using System.Xml;
using checkExamResult.Server.Model;


namespace checkExamResult.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class HomeController : ControllerBase
	{
		private readonly string _connectionString;
		private readonly ILogger<HomeController> _logger;
		private readonly DataLayer _dataLayer;

		public HomeController(DataLayer dataLayer)
		{
			_dataLayer = dataLayer;
			//_context = context;
		}

//login
		[HttpPost("Login")]
		public IActionResult Login([FromBody] JsonElement json)
		{

			if (json.TryGetProperty("UserID", out JsonElement UniqueIDValue) &&
				json.TryGetProperty("Password", out JsonElement PasswordValue))
			{
				string UserID = UniqueIDValue.GetString();
				string password = PasswordValue.GetString();
				try
				{
					var ds = _dataLayer.GetLoginDataAsync(UserID, password);

					if (ds == null || ds.Tables.Count == 0)
					{
						return Ok(new { status = "fail" });
					}
					var loginData = new List<Dictionary<string, object>>();


					foreach (DataRow row in ds.Tables[0].Rows)
					{
						var rowData = new Dictionary<string, object>();
						foreach (DataColumn col in ds.Tables[0].Columns)
						{
							rowData[col.ColumnName] = row[col];
						}
						loginData.Add(rowData);
					}
					return Ok(new { status = "success", Message = "Data retrieved successfully", data = loginData });

				}
				catch (Exception ex)
				{
					_logger.LogError(ex, "Error in Login ");
					return StatusCode(500, new { Status = "error", Message = "An error occurred during login" });
				}
			}
			return BadRequest();
		}
//insert to the DB
		[HttpPost("InsertAnswerBookManagementData")]
		public async Task<IActionResult> CreateExamForm([FromBody] ExamForm form)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			
			try
			{
				_dataLayer.SaveExamForm(form);
				//return CreatedAtAction(nameof(CreateExamForm), new { RollNo = form.RollNo }, form);
				return Ok(new { status = "data submitted successfully", Message = "data sumitted successfully",Data=form });
			}

			catch (Exception ex)
			{
				_logger.LogError(ex, "Error saving ExamForm");
				return StatusCode(500, new { Status = "error", Message = "An error occurred while saving the exam form" });
			}
		}
        //delete from the DB on the basis id 
        [HttpDelete("DeleteExamFormByid/{id}")]
        public async Task<IActionResult> DeleteExamFormByRollNo(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { Status = "error", Message = "Valid RollNo is required" });
            }

            try
            {
                var rowsAffected = await _dataLayer.DeleteExamFormByRollNoAsync(id);

                if (rowsAffected == 0)
                {
                    return NotFound(new { Status = "error", Message = $"No exam form found with id: {id}" });
                }

                return Ok(new { Status = "success", Message = $"Exam form with id: {id} deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting ExamForm with id: {id}", id);
                return StatusCode(500, new { Status = "error", Message = "An error occurred while deleting the exam form" });
            }
        }


        [HttpGet("SelectAnswerBookManagementData")]
		public async Task<IActionResult> GetAllExamForms()
		{
			try
			{
				var examForms = await _dataLayer.GetAllExamFormsAsync();
				if (examForms == null || !examForms.Any())
				{
					return NotFound(new { Status = "error", Message = "No exam forms found" });
				}

				return Ok(new
				{
					Status = "success",
					Message = "Data retrieved successfully",
					Data = examForms
				});
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error retrieving all exam forms");
				return StatusCode(500, new { Status = "error", Message = "An error occurred while retrieving the data" });
			}
		}


		[HttpPut("UpdateAnswerBookManagementData/{id}")]
		public async Task<IActionResult> UpdateExamForm(int id,[FromBody] ExamForm form)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
            form.id = id;
            try
			{
				_dataLayer.UpdateExamForm(form);
				return Ok(new { status = "data updated successfully", Message = "data updated successfully", Data = form });
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error updating ExamForm");
				return StatusCode(500, new { Status = "error", Message = "An error occurred while updating the exam form" });
			}
		}

	}

}

