import xlsx from "json-as-xlsx";

export function downloadToExcel(data) {
  console.log(data);  
  let columns = [
    {
      sheet: "Members",
      columns: [
        { label: "Created At", value: (row) => {const date = new Date(row.createdAt);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            };const udata = date.toLocaleDateString(undefined, options); return udata }},
        { label: "Full Name", value: "fullName" },
        { label: "Mobile Number", value: "mobileNum" },
        { label: "Email ID", value: "emailId" },
        { label: "Date of Birth", value: (row) => {const date = new Date(row.birthDate);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; return formattedDate }},
        { label: "Address", value: "address" },
        { label: "Office Address", value: "officeAddress" },
        { label: "Name of Spouse", value: "spouseName" },
        { label: "Spouse Mobile Number", value: "spouseNum" },
        { label: "Spouse Date of Birth", value: (row) => {const date = new Date(row.spouseBirth);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; return formattedDate } },
        { label: "Wedding Anniversary Date", value: (row) => {const date = new Date(row.anniversaryDate);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; return formattedDate }},
        { label: "Member's Photo URl", value: "pic" },
        { label: "Couple Photo URL", value: "couplePic" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Members Excel",
  };

  xlsx(columns, settings);
}