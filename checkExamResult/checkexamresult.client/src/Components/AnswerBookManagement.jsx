// import { useState } from 'react';
// import axios from 'axios';

// // InputField Component
// const InputField = ({ label, type = 'text', name, value, onChange, placeholder, onKeyPress }) => (
//   <div className="mb-2">
//     <label className="block text-sm font-semibold text-slate-800 mb-1 tracking-wide">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       onKeyPress={onKeyPress}
//       className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 placeholder-gray-400 text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
//       placeholder={placeholder}
//     />
//   </div>
// );

// // SelectField Component
// const SelectField = ({ label, name, value, onChange, options }) => (
//   <div className="mb-2">
//     <label className="block text-sm font-semibold text-slate-800 mb-1 tracking-wide">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
//     >
//       {options.map((option, index) => (
//         <option key={index} value={option.value}>{option.label}</option>
//       ))}
//     </select>
//   </div>
// );

// // TextAreaField Component
// const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 2 }) => (
//   <div className="mb-2">
//     <label className="block text-sm font-semibold text-slate-800 mb-1 tracking-wide">{label}</label>
//     <textarea
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 placeholder-gray-400 text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
//       placeholder={placeholder}
//       rows={rows}
//     />
//   </div>
// );

// const AnswerBookManagement = () => {
//   const [formData, setFormData] = useState({
//     RollNo: '',
//     Subcentercode: '',
//     SubjectCode: '',
//     UserName: '',
//     Date: '',
//     AB1: '',
//     AB2: '',
//     AB3: '',
//     HandwritingMatching: '',
//     Remarks: '',
//     Remarks1: '',
//     Remarks2: '',
//     Remarks3: '',
//     Remarks4: '',
//     Barcode: '',
//     medium: '',
//     createuser: '',
//     createdate: '',
//     TotalCount: '',
//     modifyuser: '',
//     modifydate: '',
//     status: '',
//     StatusRemarks: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastRecord, setLastRecord] = useState({});
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showAllDataModal, setShowAllDataModal] = useState(false);
//   const [allExamForms, setAllExamForms] = useState([]);
//   const [isLoadingAllData, setIsLoadingAllData] = useState(false);
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false); // <-- NEW

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter' && event.target.name === 'Barcode') {
//       console.log('Scanned Barcode:', formData.Barcode);
//     }
//   };

//   // Insert new record

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     if (!formData.RollNo || !formData.Subcentercode || !formData.SubjectCode) {
//       setError('Roll No, Subcenter Code, and Subject Code are required.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://localhost:7221/api/Home/InsertAnswerBookManagementData',
//         formData,
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       alert('Form submitted successfully!');
//       setLastRecord(response.data.data || response.data[0] || {});
//       setFormData({
//         RollNo: '',
//         Subcentercode: '',
//         SubjectCode: '',
//         UserName: '',
//         Date: '',
//         AB1: '',
//         AB2: '',
//         AB3: '',
//         HandwritingMatching: '',
//         Remarks: '',
//         Remarks1: '',
//         Remarks2: '',
//         Remarks3: '',
//         Remarks4: '',
//         Barcode: '',
//         medium: '',
//         createuser: '',
//         createdate: '',
//         TotalCount: '',
//         modifyuser: '',
//         modifydate: '',
//         status: '',
//         StatusRemarks: '',
//       });
//     } catch (err) {
//       setError(err.response?.data?.Message || 'Failed to submit form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const selectOptions = [
//     { value: '', label: 'Select' },
//     { value: 'Yes', label: 'Yes' },
//     { value: 'No', label: 'No' },
//   ];

//   const statusOptions = [
//     { value: '', label: 'Select' },
//     { value: 'Active', label: 'Active' },
//     { value: 'Inactive', label: 'Inactive' },
//     { value: 'Pending', label: 'Pending' },
//   ];

//   // Fetch all records
//   const handleShow = async () => {
//     setIsLoadingAllData(true);
//     setError(null);
//     setAllExamForms([]);
//     setSelectedRecords([]);

//     try {
//       const response = await axios.get('https://localhost:7221/api/Home/SelectAnswerBookManagementData');
//       if (response.data.data && response.data.data.length > 0) {
//         setAllExamForms(response.data.data);
//         setShowAllDataModal(true);
//       } else {
//         setError('No exam forms found.');
//       }
//     } catch (err) {
//       setError(err.response?.data?.Message || 'Failed to fetch exam forms. Please try again.');
//     } finally {
//       setIsLoadingAllData(false);
//     }
//   };

//   // Select record for edit (from popup)
//   const handleSelectRecord = (record) => {
//     setSelectedRecordId(record.id);
//   };

//   // When user clicks "Update" in popup, fill form and close popup
//   const handleEditFromPopup = () => {
//     const record = allExamForms.find(r => r.id === selectedRecordId);
//     if (record) {
//       setFormData({ ...record });
//       setIsEditMode(true);
//       setShowAllDataModal(false);
//     }
//   };

//   // Update record (from main form)
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedRecordId) {
//       setError('Please select a record to update.');
//       return;
//     }
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       await axios.put(
//         `https://localhost:7221/api/Home/UpdateAnswerBookManagementData/${selectedRecordId}`,
//         formData,
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       alert('Record updated successfully!');
//       setIsEditMode(false);
//       setSelectedRecordId(null);
//       setFormData({
//         RollNo: '',
//         Subcentercode: '',
//         SubjectCode: '',
//         UserName: '',
//         Date: '',
//         AB1: '',
//         AB2: '',
//         AB3: '',
//         HandwritingMatching: '',
//         Remarks: '',
//         Remarks1: '',
//         Remarks2: '',
//         Remarks3: '',
//         Remarks4: '',
//         Barcode: '',
//         medium: '',
//         createuser: '',
//         createdate: '',
//         TotalCount: '',
//         modifyuser: '',
//         modifydate: '',
//         status: '',
//         StatusRemarks: '',
//       });
//       await handleShow(); // Refresh table if needed
//     } catch (err) {
//       setError(err.response?.data?.Message || 'Failed to update record. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete logic remains unchanged...
//   // const handleDeleteSelected = async () => {
//   //   if (selectedRecords.length === 0) {
//   //     setError('Please select at least one record to delete.');
//   //     return;
//   //   }

//   //   setIsDeleting(true);
//   //   setError(null);

//   //   try {
//   //     for (const id of selectedRecords) {
//   //       console.log(`Deleting record with id=${id}`);
//   //       await axios.delete(`https://localhost:7221/api/Home/DeleteExamFormById/${id}`);
//   //     }

//   //     setAllExamForms((prev) =>
//   //       prev.filter((record) => !selectedRecords.includes(record.Id))
//   //     );
//   //     setSelectedRecords([]);
//   //     if (selectedRecords.includes(lastRecord.Id)) {
//   //       setLastRecord({});
//   //     }

//   //     alert('Selected records deleted successfully!');
//   //     await handleShow();
//   //   } catch (err) {
//   //     console.error('Error deleting selected records:', err);
//   //     setError(err.response?.data?.Message || 'Failed to delete selected records. Please try again.');
//   //   } finally {
//   //     setIsDeleting(false);
//   //   }
//   // };
// const handleDeleteSelected = async () => {
//   if (!selectedRecordId) {
//     setError('Please select a record to delete.');
//     return;
//   }

//   setIsDeleting(true);
//   setError(null);

//   try {
//     await axios.delete(`https://localhost:7221/api/Home/DeleteExamFormById/${selectedRecordId}`);
//     setAllExamForms((prev) =>
//       prev.filter((record) => record.id !== selectedRecordId)
//     );
//     if (lastRecord.id === selectedRecordId) {
//       setLastRecord({});
//     }
//     setSelectedRecordId(null);
//     alert('Record deleted successfully!');
//     await handleShow();
//   } catch (err) {
//     setError(err.response?.data?.Message || 'Failed to delete record. Please try again.');
//   } finally {
//     setIsDeleting(false);
//   }
// };
//   const handleReset = (e) => {
//     e.preventDefault();
//     setFormData({
//       RollNo: '',
//       Subcentercode: '',
//       SubjectCode: '',
//       UserName: '',
//       Date: '',
//       AB1: '',
//       AB2: '',
//       AB3: '',
//       HandwritingMatching: '',
//       Remarks: '',
//       Remarks1: '',
//       Remarks2: '',
//       Remarks3: '',
//       Remarks4: '',
//       Barcode: '',
//       medium: '',
//       createuser: '',
//       createdate: '',
//       TotalCount: '',
//       modifyuser: '',
//       modifydate: '',
//       status: '',
//       StatusRemarks: ''
//     });
//     setIsEditMode(false);
//     setSelectedRecordId(null);
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-start justify-start p-0 w-full min-h-screen">
//       <div className="bg-white rounded-xl shadow-xl w-3/5 flex flex-col">
//         <header className="flex-none p-4 border-b border-gray-200">
//           <h1 className="text-xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
//             Examination Form
//           </h1>
//         </header>

//         <main className="flex-auto px-4 py-2 sm:px-6 sm:py-3">
//           {isEditMode && (
//             <div className="mb-2 text-indigo-700 font-semibold">
//               Editing record ID: {selectedRecordId}
//             </div>
//           )}
//           <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//               <InputField
//                 label="Roll No"
//                 type="number"
//                 name="RollNo"
//                 value={formData.RollNo}
//                 onChange={handleChange}
//                 placeholder="Enter roll number"
//               />
//               <InputField
//                 label="Subcenter Code"
//                 type="number"
//                 name="Subcentercode"
//                 value={formData.Subcentercode}
//                 onChange={handleChange}
//                 placeholder="Enter subcenter code"
//               />
//               <InputField
//                 label="Subject Code"
//                 type="number"
//                 name="SubjectCode"
//                 value={formData.SubjectCode}
//                 onChange={handleChange}
//                 placeholder="Enter subject code"
//               />
//               <InputField
//                 label="User  Name"
//                 name="User Name"
//                 value={formData.UserName}
//                 onChange={handleChange}
//                 placeholder="Enter user name"
//               />
//               <InputField
//                 label="Date"
//                 name="Date"
//                 value={formData.Date}
//                 onChange={handleChange}
//                 placeholder="Enter date"
//               />
//               <InputField
//                 label="AB1"
//                 type="number"
//                 name="AB1"
//                 value={formData.AB1}
//                 onChange={handleChange}
//                 placeholder="Enter AB1 count"
//               />
//               <InputField
//                 label="AB2"
//                 type="number"
//                 name="AB2"
//                 value={formData.AB2}
//                 onChange={handleChange}
//                 placeholder="Enter AB2 count"
//               />
//               <InputField
//                 label="AB3"
//                 type="number"
//                 name="AB3"
//                 value={formData.AB3}
//                 onChange={handleChange}
//                 placeholder="Enter AB3 count"
//               />
//               <SelectField
//                 label="Handwriting Matching"
//                 name="HandwritingMatching"
//                 value={formData.HandwritingMatching}
//                 onChange={handleChange}
//                 options={selectOptions}
//               />
//               <InputField
//                 label="Barcode"
//                 name="Barcode"
//                 value={formData.Barcode}
//                 onChange={handleChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Enter barcode"
//               />
//               <InputField
//                 label="Medium"
//                 name="medium"
//                 value={formData.medium}
//                 onChange={handleChange}
//                 placeholder="Enter medium"
//               />
//               <InputField
//                 label="Create User"
//                 name="createuser"
//                 value={formData.createuser}
//                 onChange={handleChange}
//                 placeholder="Enter create user"
//               />
//               <InputField
//                 label="Create Date"
//                 type="datetime-local"
//                 name="createdate"
//                 value={formData.createdate}
//                 onChange={handleChange}
//                 placeholder="Enter create date"
//               />
//               <InputField
//                 label="Total Count"
//                 type="number"
//                 name="TotalCount"
//                 value={formData.TotalCount}
//                 onChange={handleChange}
//                 placeholder="Enter total count"
//               />
//               <InputField
//                 label="Modify User"
//                 name="modifyuser"
//                 value={formData.modifyuser}
//                 onChange={handleChange}
//                 placeholder="Enter modify user"
//               />
//               <InputField
//                 label="Modify Date"
//                 type="datetime-local"
//                 name="modifydate"
//                 value={formData.modifydate}
//                 onChange={handleChange}
//                 placeholder="Enter modify date"
//               />
//               <SelectField
//                 label="Status"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 options={statusOptions}
//               />
//               <TextAreaField
//                 label="Status Remarks"
//                 name="StatusRemarks"
//                 value={formData.StatusRemarks}
//                 onChange={handleChange}
//                 placeholder="Enter status remarks"
//                 rows={3}
//               />
//               <TextAreaField
//                 label="Remarks"
//                 name="Remarks"
//                 value={formData.Remarks}
//                 onChange={handleChange}
//                 placeholder="Enter remarks"
//                 rows={3}
//               />
//               <TextAreaField
//                 label="Remarks1"
//                 name="Remarks1"
//                 value={formData.Remarks1}
//                 onChange={handleChange}
//                 placeholder="Enter remarks 1"
//                 rows={3}
//               />
//               <TextAreaField
//                 label="Remarks2"
//                 name="Remarks2"
//                 value={formData.Remarks2}
//                 onChange={handleChange}
//                 placeholder="Enter remarks 2"
//                 rows={3}
//               />
//               <TextAreaField
//                 label="Remarks3"
//                 name="Remarks3"
//                 value={formData.Remarks3}
//                 onChange={handleChange}
//                 placeholder="Enter remarks 3"
//                 rows={3}
//               />
//               <TextAreaField
//                 label="Remarks4"
//                 name="Remarks4"
//                 value={formData.Remarks4}
//                 onChange={handleChange}
//                 placeholder="Enter remarks 4"
//                 rows={3}
//               />
//             </div>
//             <footer className="flex-none p-4 border-t border-gray-200 flex justify-end bg-white gap-2">
//               <button
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out text-sm"
//                 type="submit"
//                 disabled={isSubmitting}
//               >
//                 {isEditMode ? (isSubmitting ? 'Updating...' : 'Update') : (isSubmitting ? 'Submitting...' : 'Submit')}
//               </button>
//               <button
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out text-sm"
//                 onClick={handleShow}
//                 disabled={isLoadingAllData}
//                 type="button"
//               >
//                 {isLoadingAllData ? 'Loading...' : 'Show All'}
//               </button>
//               <button
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out text-sm"
//                 onClick={handleReset}
//                 type="button"
//               >
//                 RESET
//               </button>
//             </footer>
//           </form>

//           {/* Last Submitted Record */}
//           {Object.keys(lastRecord).length > 0 && (
//             <div className="mt-4">
//               <h2 className="text-base font-semibold text-slate-800 mb-2">Last Submitted Record</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full bg-white border border-gray-200 rounded-md text-sm">
//                   <thead>
//                     <tr className="bg-indigo-50 text-gray-700 text-xs font-semibold">
//                       {Object.keys(formData).map((key) => (
//                         <th
//                           key={key}
//                           className="px-2 py-1 text-left font-semibold border-b border-gray-200 whitespace-normal"
//                         >
//                           {key
//                             .replace(/([A-Z])/g, ' $1')
//                             .replace(/^./, (str) => str.toUpperCase())}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="text-gray-800 text-xs">
//                       {Object.keys(formData).map((key) => (
//                         <td
//                           key={key}
//                           className="px-2 py-1 border-b border-gray-200 whitespace-normal"
//                         >
//                           {lastRecord[key] != null ? lastRecord[key].toString() : '-'}
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {isSubmitting && <div className="mt-3 text-gray-600 text-sm">Submitting...</div>}
//           {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

//           {/* Modal for All Exam Forms */}
//           {showAllDataModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
//                 <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                   All Exam Forms
//                 </h3>
//                 {isLoadingAllData ? (
//                   <div className="text-gray-600 text-sm">Loading data...</div>
//                 ) : allExamForms.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="w-full bg-white border border-gray-200 rounded-md text-sm">
//                       <thead>
//                         <tr className="bg-indigo-50 text-gray-700 text-xs font-semibold">
//                           <th className="px-2 py-1 text-left font-semibold border-b border-gray-200">
//                             Delete / Update
//                           </th>
//                           <th className="px-2 py-1 text-left font-semibold border-b border-gray-200">ID</th>
//                           {Object.keys(formData).map((key) => (
//                             <th
//                               key={key}
//                               className="px-2 py-1 text-left font-semibold border-b border-gray-200 whitespace-normal"
//                             >
//                               {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {allExamForms.map((record) => (
//                           <tr key={record.id} className="text-gray-800 text-xs">
//                             <td className="px-2 py-1 border-b border-gray-200 flex gap-2 items-center">
//                               {/* Checkbox for delete */}
//                               <td className="px-2 py-1 border-b border-gray-200 flex gap-2 items-center">
//                                 <input
//                                   type="radio"
//                                   checked={selectedRecordId === record.id}
//                                   onChange={() => setSelectedRecordId(record.id)}
//                                   name="selectRecord"
//                                 />
//                               </td>
//                             </td>
//                             <td className="px-2 py-1 border-b border-gray-200">{record.id}</td>
//                             {Object.keys(formData).map((key) => (
//                               <td
//                                 key={key}
//                                 className="px-2 py-1 border-b border-gray-200 whitespace-normal"
//                               >
//                                 {record[key] != null ? record[key].toString() : '-'}
//                               </td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="text-gray-600 text-sm">No exam forms available.</div>
//                 )}
//                 <div className="flex justify-end mt-4 gap-2">
//                   <button
//                     className="bg-red-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
//                     onClick={handleDeleteSelected}
//                     disabled={isDeleting || !selectedRecords }
//                   >
//                     {isDeleting ? 'Deleting...' : 'Delete'}
//                   </button>

//                   <button
//                     className="bg-red-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
//                     onClick={handleEditFromPopup}
//                     disabled={!selectedRecordId}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="bg-gray-300 text-gray-800 px-4 py-1 rounded-md font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
//                     onClick={() => setShowAllDataModal(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AnswerBookManagement;


import { useState } from 'react';
import axios from 'axios';

// InputField Component
const InputField = ({ label, type = 'text', name, value, onChange, placeholder, onKeyPress, onBlur }) => (
  <div className="mb-2">
    <label className="block text-sm font-semibold text-slate-800 mb-1 tracking-wide">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onBlur={onBlur}

      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 placeholder-gray-400 text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
      placeholder={placeholder}
    />
  </div>
);

// SelectField Component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="mb-2">
    <label className="block text-sm font-semibold text-slate-800 mb-1 tracking-wide">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

// TextAreaField Component
const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 2 }) => (
  <div className="mb-2">
    <label className="block text-sm font-semibold text-slate-800 mb-1 tracking-wide">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 placeholder-gray-400 text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

const AnswerBookManagement = () => {
  const [formData, setFormData] = useState({
    RollNo: '',
    Subcentercode: '',
    SubjectCode: '',
    UserName: '',
    Date: '',
    AB1: '',
    AB2: '',
    AB3: '',
    HandwritingMatching: '',
    Remarks: '',
    Remarks1: '',
    Remarks2: '',
    Remarks3: '',
    Remarks4: '',
    Barcode: '',
    medium: '',
    createuser: '',
    createdate: '',
    TotalCount: '',
    modifyuser: '',
    modifydate: '',
    status: '',
    StatusRemarks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [lastRecord, setLastRecord] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAllDataModal, setShowAllDataModal] = useState(false);
  const [allExamForms, setAllExamForms] = useState([]);
  const [isLoadingAllData, setIsLoadingAllData] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [barcodeList, setBarcodeList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.name === 'Barcode') {
      event.preventDefault(); // prevent form submit

      const value = formData.Barcode.trim();
      if (value && !barcodeList.includes(value)) {
        const parts = value.split('-');
        if (parts.length === 3) {
          const [rollNo, subcenterCode, subjectCode] = parts;

          setFormData((prev) => ({
            ...prev,
            RollNo: rollNo,
            Subcentercode: subcenterCode,
            SubjectCode: subjectCode,
            Barcode: '', // clear field
          }));

          setBarcodeList((prev) => [...prev, value]);
        } else {
          alert('Invalid barcode format. Expected: RollNo-Subcentercode-SubjectCode');
        }
      }
    }
  };


  const handleBarcodeBlur = (e) => {
    const value = e.target.value.trim();

    // Assuming barcode format: RollNo-Subcentercode-SubjectCode
    if (value && !barcodeList.includes(value)) {
      const parts = value.split('-');
      if (parts.length === 3) {
        const [rollNo, subcenterCode, subjectCode] = parts;

        setFormData((prev) => ({
          ...prev,
          RollNo: rollNo,
          Subcentercode: subcenterCode,
          SubjectCode: subjectCode,
          Barcode: '', // clear field
        }));

        setBarcodeList((prev) => [...prev, value]);
      } else {
        alert('Invalid barcode format. Expected: RollNo-Subcentercode-SubjectCode');
      }
    }
  };


  // Insert new record

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // if (!formData.RollNo || !formData.Subcentercode || !formData.SubjectCode) {
    //   setError('Roll No, Subcenter Code, and Subject Code are required.');
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      const response = await axios.post(
        'https://localhost:7221/api/Home/InsertAnswerBookManagementData',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Form submitted successfully!');
      setLastRecord(response.data.data || response.data[0] || {});
      setFormData({
        RollNo: '',
        Subcentercode: '',
        SubjectCode: '',
        UserName: '',
        Date: '',
        AB1: '',
        AB2: '',
        AB3: '',
        HandwritingMatching: '',
        Remarks: '',
        Remarks1: '',
        Remarks2: '',
        Remarks3: '',
        Remarks4: '',
        Barcode: '',
        medium: '',
        createuser: '',
        createdate: '',
        TotalCount: '',
        modifyuser: '',
        modifydate: '',
        status: '',
        StatusRemarks: '',
      });
    } catch (err) {
      setError(err.response?.data?.Message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectOptions = [
    { value: '', label: 'Select' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  const statusOptions = [
    { value: '', label: 'Select' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
  ];

  // Fetch all records
  const handleShow = async () => {
    setIsLoadingAllData(true);
    setError(null);
    setAllExamForms([]);
    setSelectedRecords([]);

    try {
      const response = await axios.get('https://localhost:7221/api/Home/SelectAnswerBookManagementData');
      if (response.data.data && response.data.data.length > 0) {
        setAllExamForms(response.data.data);
        setShowAllDataModal(true);
      } else {
        setError('No exam forms found.');
      }
    } catch (err) {
      setError(err.response?.data?.Message || 'Failed to fetch exam forms. Please try again.');
    } finally {
      setIsLoadingAllData(false);
    }
  };

  // Select record for edit (from popup)
  const handleSelectRecord = (record) => {
    setSelectedRecordId(record.id);
  };

  // When user clicks "Update" in popup, fill form and close popup
  // const handleEditFromPopup = () => {
  //   const record = allExamForms.find(r => r.id === selectedRecordId);
  //   if (record) {
  //     setFormData({ ...record });
  //     setIsEditMode(true);
  //     setShowAllDataModal(false);
  //   }
  // };
  // When user clicks "Update" in popup, fill form and close popup
  const handleEditFromPopup = () => {
    const record = allExamForms.find(r => r.id === selectedRecordId);
    if (record) {
      // Ensure the ID is part of formData for updates
      setFormData({ ...record, id: record.id });
      setIsEditMode(true);
      setShowAllDataModal(false);
    }
  };
  // Update record (from main form)
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   if (!selectedRecordId) {
  //     setError('Please select a record to update.');
  //     return;
  //   }
  //   setIsSubmitting(true);
  //   setError(null);

  //   try {
  //     await axios.put(
  //       `https://localhost:7221/api/Home/UpdateAnswerBookManagementData/${selectedRecordId}`,
  //       formData,
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );
  //     alert('Record updated successfully!');
  //     setIsEditMode(false);
  //     setSelectedRecordId(null);
  //     setFormData({
  //       RollNo: '',
  //       Subcentercode: '',
  //       SubjectCode: '',
  //       UserName: '',
  //       Date: '',
  //       AB1: '',
  //       AB2: '',
  //       AB3: '',
  //       HandwritingMatching: '',
  //       Remarks: '',
  //       Remarks1: '',
  //       Remarks2: '',
  //       Remarks3: '',
  //       Remarks4: '',
  //       Barcode: '',
  //       medium: '',
  //       createuser: '',
  //       createdate: '',
  //       TotalCount: '',
  //       modifyuser: '',
  //       modifydate: '',
  //       status: '',
  //       StatusRemarks: '',
  //     });
  //     await handleShow(); // Refresh table if needed
  //   } catch (err) {
  //     setError(err.response?.data?.Message || 'Failed to update record. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  // Update record (from main form)
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedRecordId) {
      setError('Please select a record to update.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      // Make sure 'formData' contains the 'id' when sending to the API
      await axios.put(
        `https://localhost:7221/api/Home/UpdateAnswerBookManagementData/${selectedRecordId}`,
        formData, // formData should now include the id
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Record updated successfully!');
      setIsEditMode(false);
      setSelectedRecordId(null);
      handleReset(); // Use your existing reset function
      await handleShow(); // Refresh table if needed
    } catch (err) {
      setError(err.response?.data?.Message || 'Failed to update record. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedRecordId) {
      setError('Please select a record to delete.');
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`https://localhost:7221/api/Home/DeleteExamFormById/${selectedRecordId}`);
      setAllExamForms((prev) =>
        prev.filter((record) => record.id !== selectedRecordId)
      );
      if (lastRecord.id === selectedRecordId) {
        setLastRecord({});
      }
      setSelectedRecordId(null);
      alert('Record deleted successfully!');
      await handleShow();
    } catch (err) {
      setError(err.response?.data?.Message || 'Failed to delete record. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      RollNo: '',
      Subcentercode: '',
      SubjectCode: '',
      UserName: '',
      Date: '',
      AB1: '',
      AB2: '',
      AB3: '',
      HandwritingMatching: '',
      Remarks: '',
      Remarks1: '',
      Remarks2: '',
      Remarks3: '',
      Remarks4: '',
      Barcode: '',
      medium: '',
      createuser: '',
      createdate: '',
      TotalCount: '',
      modifyuser: '',
      modifydate: '',
      status: '',
      StatusRemarks: ''
    });
    setIsEditMode(false);
    setSelectedRecordId(null);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-start justify-start p-0 w-full min-h-screen">
      <div className="bg-white rounded-xl shadow-xl w-3/5 flex flex-col">
        <header className="flex-none p-4 border-b border-gray-200">
          <h1 className="text-xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Examination Form
          </h1>
        </header>

        <main className="flex-auto px-4 py-2 sm:px-6 sm:py-3">
          {isEditMode && (
            <div className="mb-2 text-indigo-700 font-semibold">
              Editing record ID: {selectedRecordId}
            </div>
          )}
          <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <InputField
                label="Roll No"
                type="number"
                name="RollNo"
                value={formData.RollNo}
                onChange={handleChange}
                placeholder="Enter roll number"
              />
              <InputField
                label="Subcenter Code"
                type="number"
                name="Subcentercode"
                value={formData.Subcentercode}
                onChange={handleChange}
                placeholder="Enter subcenter code"
              />
              <InputField
                label="Subject Code"
                type="number"
                name="SubjectCode"
                value={formData.SubjectCode}
                onChange={handleChange}
                placeholder="Enter subject code"
              />
              <InputField
                label="User  Name"
                name="User Name"
                value={formData.UserName}
                onChange={handleChange}
                placeholder="Enter user name"
              />
              <InputField
                label="Date"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                placeholder="Enter date"
              />
              <InputField
                label="AB1"
                type="number"
                name="AB1"
                value={formData.AB1}
                onChange={handleChange}
                placeholder="Enter AB1 count"
              />
              <InputField
                label="AB2"
                type="number"
                name="AB2"
                value={formData.AB2}
                onChange={handleChange}
                placeholder="Enter AB2 count"
              />
              <InputField
                label="AB3"
                type="number"
                name="AB3"
                value={formData.AB3}
                onChange={handleChange}
                placeholder="Enter AB3 count"
              />
              <SelectField
                label="Handwriting Matching"
                name="HandwritingMatching"
                value={formData.HandwritingMatching}
                onChange={handleChange}
                options={selectOptions}
              />
              <InputField
                label="Barcode"
                name="Barcode"
                value={formData.Barcode}
                onChange={handleChange}
                onkeyPress={handleKeyPress} // ✅ Now this will work
                onBlur={handleBarcodeBlur}
                placeholder="Enter barcode"
              />

              <InputField
                label="Medium"
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                placeholder="Enter medium"
              />
              <InputField
                label="Create User"
                name="createuser"
                value={formData.createuser}
                onChange={handleChange}
                placeholder="Enter create user"
              />
              <InputField
                label="Create Date"
                type="datetime-local"
                name="createdate"
                value={formData.createdate}
                onChange={handleChange}
                placeholder="Enter create date"
              />
              <InputField
                label="Total Count"
                type="number"
                name="TotalCount"
                value={formData.TotalCount}
                onChange={handleChange}
                placeholder="Enter total count"
              />
              <InputField
                label="Modify User"
                name="modifyuser"
                value={formData.modifyuser}
                onChange={handleChange}
                placeholder="Enter modify user"
              />
              <InputField
                label="Modify Date"
                type="datetime-local"
                name="modifydate"
                value={formData.modifydate}
                onChange={handleChange}
                placeholder="Enter modify date"
              />
              <SelectField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />
              <TextAreaField
                label="Status Remarks"
                name="StatusRemarks"
                value={formData.StatusRemarks}
                onChange={handleChange}
                placeholder="Enter status remarks"
                rows={3}
              />
              <TextAreaField
                label="Remarks"
                name="Remarks"
                value={formData.Remarks}
                onChange={handleChange}
                placeholder="Enter remarks"
                rows={3}
              />
              <TextAreaField
                label="Remarks1"
                name="Remarks1"
                value={formData.Remarks1}
                onChange={handleChange}
                placeholder="Enter remarks 1"
                rows={3}
              />
              <TextAreaField
                label="Remarks2"
                name="Remarks2"
                value={formData.Remarks2}
                onChange={handleChange}
                placeholder="Enter remarks 2"
                rows={3}
              />
              <TextAreaField
                label="Remarks3"
                name="Remarks3"
                value={formData.Remarks3}
                onChange={handleChange}
                placeholder="Enter remarks 3"
                rows={3}
              />
              <TextAreaField
                label="Remarks4"
                name="Remarks4"
                value={formData.Remarks4}
                onChange={handleChange}
                placeholder="Enter remarks 4"
                rows={3}
              />
            </div>
            <footer className="flex-none p-4 border-t border-gray-200 flex justify-end bg-white gap-2">
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out text-sm"
                type="submit" // This is crucial for triggering the form's onSubmit
                disabled={isSubmitting}
              >
                {isEditMode ? (isSubmitting ? 'Updating...' : 'Update') : (isSubmitting ? 'Submitting...' : 'Submit')}
              </button>
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out text-sm"
                onClick={handleShow}
                disabled={isLoadingAllData}
                type="button"
              >
                {isLoadingAllData ? 'Loading...' : 'Show All'}
              </button>
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out text-sm"
                onClick={handleReset}
                type="button"
              >
                RESET
              </button>
            </footer>
          </form>

          {/* Last Submitted Record */}
          {Object.keys(lastRecord).length > 0 && (
            <div className="mt-4">
              <h2 className="text-base font-semibold text-slate-800 mb-2">Last Submitted Record</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-md text-sm">
                  <thead>
                    <tr className="bg-indigo-50 text-gray-700 text-xs font-semibold">
                      {Object.keys(formData).map((key) => (
                        <th
                          key={key}
                          className="px-2 py-1 text-left font-semibold border-b border-gray-200 whitespace-normal"
                        >
                          {key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-800 text-xs">
                      {Object.keys(formData).map((key) => (
                        <td
                          key={key}
                          className="px-2 py-1 border-b border-gray-200 whitespace-normal"
                        >
                          {lastRecord[key] != null ? lastRecord[key].toString() : '-'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isSubmitting && <div className="mt-3 text-gray-600 text-sm">Submitting...</div>}
          {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

          {/* Modal for All Exam Forms */}
          {showAllDataModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  All Exam Forms
                </h3>
                {isLoadingAllData ? (
                  <div className="text-gray-600 text-sm">Loading data...</div>
                ) : allExamForms.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-md text-sm">
                      <thead>
                        <tr className="bg-indigo-50 text-gray-700 text-xs font-semibold">
                          <th className="px-2 py-1 border-b border-gray-200">Select</th>

                          {Object.keys(allExamForms[0] || {}).map((key) => (
                            <th key={key} className="px-2 py-1 border-b border-gray-200 whitespace-normal">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {allExamForms.map((record) => (
                          <tr key={record.id} className="text-gray-800 text-xs">
                            <td className="px-2 py-1 border-b border-gray-200">
                              <input
                                type="radio"
                                checked={selectedRecordId === record.id}
                                onChange={() => setSelectedRecordId(record.id)}
                                name="selectRecord"
                              />
                            </td>

                            {Object.keys(allExamForms[0] || {}).map((key) => (
                              <td key={key} className="px-2 py-1 border-b border-gray-200 whitespace-normal">
                                {record[key] != null ? record[key].toString() : '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                ) : (
                  <div className="text-gray-600 text-sm">No exam forms available.</div>
                )}
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    onClick={handleDeleteSelected}
                    disabled={isDeleting || !selectedRecords}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>

                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    onClick={handleEditFromPopup}
                    disabled={!selectedRecordId}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-1 rounded-md font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                    onClick={() => setShowAllDataModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <ul>
        {barcodeList.map((barcode, idx) => (
          <li key={idx}>{barcode}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerBookManagement;