<table className="min-w-full divide-y divide-gray-200">
  <thead>
    <tr className="bg-indigo-50 text-gray-700 text-xs font-semibold">
      <th className="px-2 py-1 text-left font-semibold border-b border-gray-200">
        Delete / Update
      </th>
      <th className="px-2 py-1 text-left font-semibold border-b border-gray-200">ID</th>
      {Object.keys(formData).map((key) => (
        <th
          key={key}
          className="px-2 py-1 text-left font-semibold border-b border-gray-200 whitespace-normal"
        >
          {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {allExamForms.map((record) => (
      <tr key={record.id} className="text-gray-800 text-xs">
        <td className="px-2 py-1 border-b border-gray-200 flex gap-2 items-center">
          {/* Checkbox for delete */}
          <input
            type="checkbox"
            checked={selectedRecords.includes(record.id)}
            onChange={() => {
              setSelectedRecords((prev) =>
                prev.includes(record.id)
                  ? prev.filter((id) => id !== record.id)
                  : [...prev, record.id]
              );
            }}
          />
          {/* Radio for update */}
          <input
            type="radio"
            checked={selectedRecordId === record.id}
            onChange={() => setSelectedRecordId(record.id)}
            name="selectRecord"
          />
        </td>
        <td className="px-2 py-1 border-b border-gray-200">{record.id}</td>
        {Object.keys(formData).map((key) => (
          <td
            key={key}
            className="px-2 py-1 border-b border-gray-200 whitespace-normal"
          >
            {record[key] != null ? record[key].toString() : '-'}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
<button
  className="bg-red-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
  onClick={handleDeleteSelected}
  disabled={isDeleting || !selectedRecordId}
>
  {isDeleting ? 'Deleting...' : 'Delete'}
</button>
{setAllExamForms((prev) =>
  prev.filter((record) => !selectedRecords.includes(record.id))
);
if (selectedRecords.includes(lastRecord.id)) {
  setLastRecord({});
}}