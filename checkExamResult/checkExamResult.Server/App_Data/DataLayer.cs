

using Azure;
using checkExamResult.Server.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.Data.SqlClient;
using Microsoft.Data.SqlClient.DataClassification;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Reflection.Emit;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Xml.Linq;


namespace checkExamResult.Server.App_Data
{
	public class DataLayer
	{
		private readonly IConfiguration _configuration;

		private SqlConnection mobjConn;
		private string mstrConnString;
		private string mstrErr;


		public string ConnectionString
		{
			get
			{
				return mstrConnString;
			}
			set
			{
				mstrConnString = value;
			}
		}


		public DataLayer(IConfiguration configuration)
		{
			_configuration = configuration;
			var con = _configuration["ConnectionStrings:DBCon"];

			//Console.WriteLine(con);
			if (con != null)
			{
				mstrConnString = con;
			}
			else
			{
				mstrConnString = null;
			}
		}

		public SqlConnection GetConnection(string strConn)
		{
			string strFunctionName = "GetConnection";
			try
			{
				if (mobjConn == null || mobjConn.State != System.Data.ConnectionState.Open)
				{
					mobjConn = new SqlConnection(strConn);
					mobjConn.Open();
				}

				return mobjConn;
			}
			catch (Exception ex)
			{
				mstrErr = ex.ToString();
				throw new Exception(strFunctionName + " : " + mstrErr);
			}
			finally
			{
				mobjConn.Close();

			}
		}


		public DataSet GetLoginDataAsync(string UserID, string password)
		{
			DataSet ds = new DataSet();

			using (SqlConnection conn = new SqlConnection(ConnectionString))
			{
				using (SqlCommand command = new SqlCommand("login", conn))
				{
					command.CommandType = CommandType.StoredProcedure;

					command.Parameters.AddWithValue("@UserID", UserID);
					command.Parameters.AddWithValue("@Password", password);

					try
					{
						using (var dataAdapter = new SqlDataAdapter(command))
							dataAdapter.Fill(ds);

					}
					catch (Exception ex)
					{
						Console.WriteLine($"Error: {ex.Message}");
						ds = null;
					}
				}
				return ds;
			}

		}

		//insert the data to DB
		public void SaveExamForm(ExamForm form)
		{
			using (SqlConnection conn = new SqlConnection(ConnectionString))
			{

				using (SqlCommand command = new SqlCommand("InsertExaminationData", conn))
				{

					command.CommandType = CommandType.StoredProcedure;
					//command.Parameters.AddWithValue("@id", form.id);
					command.Parameters.AddWithValue("@RollNo", form.RollNo);
					command.Parameters.AddWithValue("@Subcentercode", form.Subcentercode);
					command.Parameters.AddWithValue("@SubjectCode", form.SubjectCode);
					command.Parameters.AddWithValue("@UserName", form.UserName ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Date", form.Date ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@AB1", form.AB1 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@AB2", form.AB2 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@AB3", form.AB3 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@HandwritingMatching", form.HandwritingMatching ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks", form.Remarks ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks1", form.Remarks1 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks2", form.Remarks2 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks3", form.Remarks3 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks4", form.Remarks4 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Barcode", form.Barcode ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@medium", form.medium ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@createuser", form.createuser ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@createdate", form.createdate ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@TotalCount", form.TotalCount ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@modifyuser", form.modifyuser ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@modifydate", form.modifydate ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@status", form.status ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@StatusRemarks", form.StatusRemarks ?? (object)DBNull.Value);

					conn.Open();
					command.ExecuteNonQuery();
				}
			}
		}


        public async Task<int> DeleteExamFormByRollNoAsync(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                var command = new SqlCommand("DELETE FROM ExaminationData WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                return await command.ExecuteNonQueryAsync();
            }
        }



        public async Task<List<ExamForm>> GetAllExamFormsAsync()
		{
			var examForms = new List<ExamForm>();
			using (var connection = new SqlConnection(ConnectionString))
			{
				await connection.OpenAsync();
				var command = new SqlCommand("SELECTExaminationData", connection);
				using var reader = await command.ExecuteReaderAsync();
				while (await reader.ReadAsync())
				{
					examForms.Add(new ExamForm
					{
						
						RollNo = reader.GetInt32(reader.GetOrdinal("RollNo")),
						Subcentercode = reader.GetInt32(reader.GetOrdinal("Subcentercode")),
						SubjectCode = reader.GetInt32(reader.GetOrdinal("SubjectCode")),
						UserName = reader.IsDBNull(reader.GetOrdinal("UserName")) ? null : reader.GetString("UserName"),
						Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? null : reader.GetString("Date"),
						AB1 = reader.IsDBNull(reader.GetOrdinal("AB1")) ? null : (int?)reader.GetInt32(reader.GetOrdinal("AB1")),
						AB2 = reader.IsDBNull(reader.GetOrdinal("AB2")) ? null : (int?)reader.GetInt32(reader.GetOrdinal("AB2")),
						AB3 = reader.IsDBNull(reader.GetOrdinal("AB3")) ? null : (int?)reader.GetInt32(reader.GetOrdinal("AB3")),
						HandwritingMatching = reader.IsDBNull(reader.GetOrdinal("HandwritingMatching")) ? null : reader.GetString("HandwritingMatching"),
						Remarks = reader.IsDBNull(reader.GetOrdinal("Remarks")) ? null : reader.GetString("Remarks"),
						Remarks1 = reader.IsDBNull(reader.GetOrdinal("Remarks1")) ? null : reader.GetString("Remarks1"),
						Remarks2 = reader.IsDBNull(reader.GetOrdinal("Remarks2")) ? null : reader.GetString("Remarks2"),
						Remarks3 = reader.IsDBNull(reader.GetOrdinal("Remarks3")) ? null : reader.GetString("Remarks3"),
						Remarks4 = reader.IsDBNull(reader.GetOrdinal("Remarks4")) ? null : reader.GetString("Remarks4"),
						Barcode = reader.IsDBNull(reader.GetOrdinal("Barcode")) ? null : reader.GetString("Barcode"),
						medium = reader.IsDBNull(reader.GetOrdinal("medium")) ? null : reader.GetString("medium"),
						createuser = reader.IsDBNull(reader.GetOrdinal("createuser")) ? null : reader.GetString("createuser"),
						createdate = reader.IsDBNull(reader.GetOrdinal("createdate")) ? null : (DateTime?)reader.GetDateTime(reader.GetOrdinal("createdate")),
						TotalCount = reader.IsDBNull(reader.GetOrdinal("TotalCount")) ? null : (int?)reader.GetInt32(reader.GetOrdinal("TotalCount")),
						modifyuser = reader.IsDBNull(reader.GetOrdinal("modifyuser")) ? null : reader.GetString("modifyuser"),
						modifydate = reader.IsDBNull(reader.GetOrdinal("modifydate")) ? null : (DateTime?)reader.GetDateTime(reader.GetOrdinal("modifydate")),
						status = reader.IsDBNull(reader.GetOrdinal("status")) ? null : reader.GetString("status"),
						StatusRemarks = reader.IsDBNull(reader.GetOrdinal("StatusRemarks")) ? null : reader.GetString("StatusRemarks"),
                        id = reader.GetInt32(reader.GetOrdinal("id"))
                    });
				}
			}
			return examForms;
		}



		// update in the DB

		public void UpdateExamForm(ExamForm form)
		{
			using (SqlConnection conn = new SqlConnection(ConnectionString))
			{
				using (SqlCommand command = new SqlCommand("UpdateExaminationData", conn))
				{
					command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@id", form.id);
                    command.Parameters.AddWithValue("@RollNo", form.RollNo);
					command.Parameters.AddWithValue("@Subcentercode", form.Subcentercode);
					command.Parameters.AddWithValue("@SubjectCode", form.SubjectCode);
					command.Parameters.AddWithValue("@UserName", form.UserName ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Date", form.Date ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@AB1", form.AB1 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@AB2", form.AB2 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@AB3", form.AB3 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@HandwritingMatching", form.HandwritingMatching ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks", form.Remarks ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks1", form.Remarks1 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks2", form.Remarks2 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks3", form.Remarks3 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Remarks4", form.Remarks4 ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@Barcode", form.Barcode ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@medium", form.medium ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@TotalCount", form.TotalCount ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@modifyuser", form.modifyuser ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@modifydate", form.modifydate ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@status", form.status ?? (object)DBNull.Value);
					command.Parameters.AddWithValue("@StatusRemarks", form.StatusRemarks ?? (object)DBNull.Value);

					conn.Open();
					command.ExecuteNonQuery();
				}
			}
		}


	}

}

