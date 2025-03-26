// // "use client"
// // import { MenuItem, Paper } from '@mui/material';
// // import * as React from 'react';
// // import { Button, Stack, Typography, Modal, TextField, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// // import { formatISO } from 'date-fns'; // To help format date and time in ISO
// // import { Ftp } from '@/components/dashboard/ftp/ftps-table';
// // import { createCron } from '@/service/schedule/createCron';
// // import { GetFtps } from '@/service';
// // import { useUser } from '@/hooks/use-user';
// // import { FtpTables } from '@/components/dashboard/ftp/ftps-table';
// // import { FtpsFilters } from '@/components/dashboard/ftp/ftps-filters';
// // import { DeleteFtp, GetVendors } from '@/service';
// // import { VendorManagement } from '@/components/vendors/Vendor';
// // // import { Vendor } from '@/components/dashboard/customer/vendors-table';


// // interface Vendor {
// //   id:string;
// //   firstName: string;
// //   lastName:string;
// //   contactNumber:boolean;
// //   email: string;
// //   companyName: string;
// //   companyAddress: string;
// //   createdAt:string;
// //   role: string;
// //   logs:string;
// //   jobStatus:string;
// // }



// // export default function Page(): React.JSX.Element {
// //   const [ftps, setFtps] = React.useState<Ftp[]>([]);
// //   const [open, setOpen] = React.useState(false);
// //   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
// //   const [operations, setOperations] = React.useState('download');
// //   const [schedule, setSchedule] = React.useState(''); 

// //   const [selectedDate, setSelectedDate] = React.useState(''); 
// //   const [selectedTime, setSelectedTime] = React.useState(''); 

// //   const page = 0;
// //   const rowsPerPage = 10;
// //   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

// //   // const getFtps = async () => {
// //   //   const ftps = await GetFtps();
// //   //   if (ftps?.error) {
// //   //     return setFtps([]);
// //   //   }
// //   //   setFtps(ftps?.ftps?.data as Ftp[]);
// //   // };
// //   const getFtps = async () => {
// //     const vendorData = await GetVendors();
// //     if (vendorData?.error) {
// //         return setFtps([]);
// //     }

// //     // Ensure vendorData.vendors is an array before using flatMap
// //     const allFtps = Array.isArray(vendorData?.vendors) 
// //         ? vendorData.vendors.flatMap(vendor => vendor.ftpPaths || []) 
// //         : [];

// //     console.log('Vendors Data:', vendorData.vendors);
// //     setFtps(allFtps);
// // };

  

// //   // React.useEffect(() => {
// //   //   GetVendors();
// //   //   getFtps();
// //   // }, []);
// //   React.useEffect(() => {
// //     getFtps(); // Ensures ftps is fetched
// //   }, []);
  
  

// //   // const handleCreateCron = (ftp: Ftp) => {
// //   //   console.log("Opening modal with FTP:", ftp);
// //   //   setSelectedFtp(ftp);
// //   //   setOpen(true);
// //   // };
// //   const handleCreateCron = (ftp: Ftp) => {
// //     if (!ftp) {
// //       console.error("No FTP selected, cannot open modal.");
// //       return;
// //     }
// //     console.log("Opening modal with FTP:", ftp);
// //     setSelectedFtp(ftp);
// //     setOpen(true);
// //   };
  
  
  

// //   // const handleSubmitCronJob = async () => {
// //   //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
// //   //     console.log('selectedFtp', selectedFtp);
// //   //     console.log('operations', operations);
// //   //     console.log('selectedDate', selectedDate);
// //   //     console.log('selectedTime', selectedTime);
// //   //     alert('Please fill in all fields');
// //   //     return;
// //   //   } 

// //   //   // Combine date and time to create a full schedule in ISO format
// //   //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
// //   //   const isoSchedule = formatISO(combinedDateTime);

// //   //   setSchedule(isoSchedule);

// //   //   // Call backend API to create the cron job
// //   //   const response = await createCron({ ftpId: selectedFtp._id, operations, schedule: isoSchedule });
// //   //   console.log('response', response);

// //   //   if (response?.statusText !== 'Created') {
// //   //     alert('Error creating cron job');
// //   //   } else {
// //   //     setOpen(false); 
// //   //     setSelectedDate('');
// //   //     setSelectedTime('');
// //   //   }
// //   // };
// //   const handleSubmitCronJob = async () => {
// //     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
// //           console.log('selectedFtp', selectedFtp);
// //       console.log('operations', operations);
// //       console.log('selectedDate', selectedDate);
// //       console.log('selectedTime', selectedTime);
// //       alert('Please fill in all fields');
// //       return;
// //     } 
  
// //     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
// //     const isoSchedule = formatISO(combinedDateTime);
  
// //     const response = await createCron({
// //       ftpId: selectedFtp._id, 
// //       operations, 
// //       schedule: isoSchedule 
// //     });
  
// //     if (response?.statusText !== 'Created') {
// //       alert('Error creating cron job');
// //     } else {
// //       setOpen(false);
// //       setSelectedDate('');
// //       setSelectedTime('');
// //     }
// //   };
  
  
  
  
  

// //   return (
// //     <Stack spacing={3}>
// //       <div className='scheduleropt' style={{display: 'flex', justifyContent: 'space-between', paddingRight: '120px'}}>
// //       <Typography variant="h4">Matrix</Typography>
// //       {/* <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftps)}>
// //               Create Scheduler
// //             </Button> */}
// //             {/* <Button
// //   variant="contained"
// //   color="primary"
// //   onClick={() => ftps.length > 0 && handleCreateCron(ftps[0])}
// // >
// //   Create Scheduler
// // </Button> */}
// // <Button
// //   variant="contained"
// //   color="primary"
// //   onClick={() => {
// //     if (ftps.length > 0) {
// //       console.log("Opening modal with first FTP:", ftps[0]);
// //       handleCreateCron(ftps[0]);
// //     } else {
// //       console.log("No FTPs available to open modal");
// //     }
// //   }}
// // >
// //   Create Scheduler
// // </Button>



// //       </div>
// //       {/* <Typography variant="h4">Matrix</Typography> */}
// //       <Modal open={open} onClose={() => setOpen(false)}>
// //         <Box sx={modalStyle}>
          

// //           <TextField
// //             fullWidth
// //             label="Operations"
// //             placeholder="Enter operations"
// //             value={operations}
// //             onChange={(e) => setOperations(e.target.value)}
// //             margin="normal"
// //             disabled
// //           />
// //           <TextField
// //   select
// //   fullWidth
// //   label="Select FTP"
// //   value={selectedFtp?._id || ''}
// //   onChange={(e) => {
// //     const ftp = ftps.find(f => f._id === e.target.value);
// //     setSelectedFtp(ftp || null);
// //   }}
// //   margin="normal"
// // >
// //   {ftps.map((ftp) => (
// //     <MenuItem key={ftp._id} value={ftp._id}>
// //       {ftp.path} {/* Assuming path is available */}
// //     </MenuItem>
// //   ))}
// // </TextField>


// //           {/* Date selection */}
// //           <TextField
// //             fullWidth
// //             label=""
// //             type="date"
// //             value={selectedDate}
// //             onChange={(e) => setSelectedDate(e.target.value)}
// //             margin="normal"
// //           />

// //           {/* Time selection */}
// //           <TextField
// //             fullWidth
// //             label="Select Time"
// //             type="time"
// //             value={selectedTime}
// //             onChange={(e) => setSelectedTime(e.target.value)}
// //             margin="normal"
// //           />

// //           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
// //             <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
// //               Submit
// //             </Button>
// //             <Button variant="outlined" onClick={() => setOpen(false)}>
// //               Cancel
// //             </Button>
// //           </Stack>
// //         </Box>
// //       </Modal>
      
// //       <TableContainer component={Paper}>
// //   <Table>
// //     <TableHead>
// //       <TableRow>
// //         <TableCell> User Name</TableCell>
// //         <TableCell>  Company name</TableCell>
// //         <TableCell>Host</TableCell>
// //         <TableCell>Status</TableCell>
// //         <TableCell>Actions</TableCell>
// //         <TableCell>Logs</TableCell>
// //       </TableRow>
// //     </TableHead>
// //     <TableBody>
// //       {paginatedFtps.map((ftp) => (
// //         <TableRow key={ftp._id}>
// //           <TableCell>{ftp.ftpUser}</TableCell>
// //           <TableCell>{ftp?.user?.companyName}</TableCell>
// //           <TableCell>{ftp.host}</TableCell>
// //           <TableCell></TableCell>    
          
            
          
// //         </TableRow>
// //       ))}
// //     </TableBody>
// //   </Table>
// // </TableContainer>


      
      
// //     </Stack>
// //   );
// // }

// // // Pagination function
// // function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
// //   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// // }

// // // Modal style
// // const modalStyle = {
// //   position: 'absolute' as 'absolute',
// //   top: '50%',
// //   left: '50%',
// //   transform: 'translate(-50%, -50%)',
// //   width: 400,
// //   bgcolor: 'background.paper',
// //   boxShadow: 24,
// //   p: 4,
// // };
// "use client";
// import { MenuItem, Paper } from "@mui/material";
// import * as React from "react";
// import {
//   Button,
//   Stack,
//   Typography,
//   Modal,
//   TextField,
//   Box,
// } from "@mui/material";
// import { formatISO } from "date-fns";
// import { Ftp } from "@/components/dashboard/ftp/ftps-table";
// import { createCron } from "@/service/schedule/createCron";
// import { GetFtps, GetVendors } from "@/service";
// import { useUser } from "@/hooks/use-user";
// import { FtpTables } from "@/components/dashboard/ftp/ftps-table";

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(true); // Open modal on page load
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [time, setTime] = React.useState("");

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const getFtps = async () => {
//     const vendorData = await GetVendors();
//     if (vendorData?.error) {
//       return setFtps([]);
//     }
//     const allFtps = Array.isArray(vendorData?.vendors)
//       ? vendorData.vendors.flatMap((vendor) => vendor.ftpPaths || [])
//       : [];
//     setFtps(allFtps);
//   };

//   const handleSelectFtp = async (ftp: Ftp) => {
//     console.log("Selected FTP:", ftp);
//     setSelectedFtp(ftp);
//     setOpen(false);

//     // Call backend API to create the cron job
//     const response = await createCron({
//       ftpId: ftp._id,
//       operations,
//       schedule: new Date().toISOString(),
//     });

//     if (response?.error) {
//       toast.setToast({ isOpen: true, message: response.error, type: "error" });
//     } else {
//       toast.setToast({ isOpen: true, message: "Cron job scheduled!", type: "success" });
//     }
//   };

//   return (
//     <Stack spacing={3}>
//       {/* FTP Selection Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500,
//             bgcolor: "background.paper",
//             p: 4,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Select an FTP
//           </Typography>
//           {ftps.length > 0 ? (
//             ftps.map((ftp) => (
//               <Button
//                 key={ftp._id}
//                 fullWidth
//                 variant="contained"
//                 sx={{ mb: 1 }}
//                 onClick={() => handleSelectFtp(ftp)}
//               >
//                 {ftp.host} - {ftp.ftpUser}
//               </Button>
//             ))
//           ) : (
//             <Typography>No FTPs found.</Typography>
//           )}
//         </Box>
//       </Modal>

//       {/* Your Existing FTP Table Component */}
//       <FtpTables ftpData={ftps} />

//       {/* Manual Cron Job Trigger */}
//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Schedule a Cron Job
//         </Typography>
//         <Stack spacing={2}>
//           <TextField
//             label="Select Operation"
//             select
//             value={operations}
//             onChange={(e) => setOperations(e.target.value)}
//           >
//             <MenuItem value="download">Download</MenuItem>
//             <MenuItem value="upload">Upload</MenuItem>
//           </TextField>
//           <TextField
//             label="Schedule Time"
//             type="datetime-local"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             onClick={async () => {
//               if (!selectedFtp) {
//                 toast.setToast({ isOpen: true, message: "Please select an FTP first!", type: "error" });
//                 return;
//               }
//               const response = await createCron({
//                 ftpId: selectedFtp._id,
//                 operations,
//                 schedule: formatISO(new Date(time)),
//               });

//               if (response?.error) {
//                 toast.setToast({ isOpen: true, message: response.error, type: "error" });
//               } else {
//                 toast.setToast({ isOpen: true, message: "Cron job scheduled!", type: "success" });
//               }
//             }}
//           >
//             Schedule Cron
//           </Button>
//         </Stack>
//       </Paper>
//     </Stack>
//   );
// }
// "use client" 
// import {  Paper } from '@mui/material';
// import * as React from 'react';
// // import { applyPagination } from ''; // Adjust path accordingly
// import { Button, Stack, Typography, Modal, TextField, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, MenuItem } from '@mui/material';
// import { formatISO } from 'date-fns';
// import { Ftp } from '@/components/dashboard/ftp/ftps-table';
// import { createCron } from '@/service/schedule/createCron';
// import { GetFtps } from '@/service';
// import { useUser } from '@/hooks/use-user';
// import { FtpTables } from '@/components/dashboard/ftp/ftps-table';
// import { FtpsFilters } from '@/components/dashboard/ftp/ftps-filters';
// import { DeleteFtp, GetVendors } from '@/service';
// import { VendorManagement } from '@/components/vendors/Vendor';

// interface Vendor {
//   id: string;
//   firstName: string;
//   lastName: string;
//   contactNumber: boolean;
//   email: string;
//   companyName: string;
//   companyAddress: string;
//   createdAt: string;
//   role: string;
//   logs: string;
//   jobStatus: string;
// }

// export default function Page(): React.JSX.Element {
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState('download');
//   const [schedule, setSchedule] = React.useState(''); 
//   const [selectedDate, setSelectedDate] = React.useState(''); 
//   const [selectedTime, setSelectedTime] = React.useState(''); 

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     const vendorData = await GetVendors();
//     if (vendorData?.error) {
//         return setFtps([]);
//     }
//     const allFtps = Array.isArray(vendorData?.vendors) 
//         ? vendorData.vendors.flatMap(vendor => vendor.ftpPaths || []) 
//         : [];
//     console.log('Vendors Data:', vendorData.vendors);
//     setFtps(allFtps);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) {
//       console.error("No FTP selected, cannot open modal.");
//       return;
//     }
//     console.log("Opening modal with FTP:", ftp);
//     setSelectedFtp(ftp);
//     setOpen(true);
//   };

//   const handleSubmitCronJob = async () => {
//     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//       alert('Please fill in all fields');
//       return;
//     } 
//     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
//     const isoSchedule = formatISO(combinedDateTime);
//     const response = await createCron({
//       ftpId: selectedFtp._id, 
//       operations, 
//       schedule: isoSchedule 
//     });
//     if (response?.statusText !== 'Created') {
//       alert('Error creating cron job');
//     } else {
//       setOpen(false);
//       setSelectedDate('');
//       setSelectedTime('');
//     }
//   };

//   return (
//     <Stack spacing={3}>
//       <div className='scheduleropt' style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '120px' }}>
//         <Typography variant="h4">Matrix</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             if (ftps.length > 0) {
//               console.log("Opening modal with first FTP:", ftps[0]);
//               handleCreateCron(ftps[0]);
//             } else {
//               console.log("No FTPs available to open modal");
//             }
//           }}
//         >
//           Create Scheduler
//         </Button>
//       </div>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={modalStyle}>
//           <TextField
//             select
//             fullWidth
//             label="Select FTP"
//             value={selectedFtp?._id || ''}
//             onChange={(e) => {
//               const ftp = ftps.find(f => f._id === e.target.value);
//               setSelectedFtp(ftp || null);
//             }}
//             margin="normal"
//           >
//             {ftps.map((ftp) => (
//               <MenuItem key={ftp._id} value={ftp._id}>
//                 {ftp.path}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             fullWidth
//             label="Select Date"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Select Time"
//             type="time"
//             value={selectedTime}
//             onChange={(e) => setSelectedTime(e.target.value)}
//             margin="normal"
//           />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
//               Submit
//             </Button>
//             <Button variant="outlined" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Company Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//               <TableCell>Logs</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={ftp._id}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp?.user?.companyName}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell></TableCell>    
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }
// function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

//   const modalStyle = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//   };
// "use client";

// import * as React from "react";
// import { Paper, Button, Stack, Typography, Modal, TextField, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, MenuItem } from "@mui/material";
// import { formatISO } from "date-fns";
// import { createCron } from "@/service/schedule/createCron";
// import { GetFtps } from "@/service";
// import { useUser } from "@/hooks/use-user";
// import { DeleteFtp, GetVendors } from "@/service";

// interface Ftp {
//   _id: string;
//   ftpUser: string;
//   host: string;
//   path: string;
// }

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [selectedTime, setSelectedTime] = React.useState("");
//   const [inprogress, setInprogress] = React.useState<boolean>(false);

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     setInprogress(true);
//     const ftpResponse = await GetFtps();
//     if (ftpResponse?.error) {
//       toast.setToast({ isOpen: true, message: ftpResponse.error, type: "error" });
//       setInprogress(false);
//       return setFtps([]);
//     }
//     setFtps(ftpResponse?.ftps?.data as Ftp[]);
//     setInprogress(false);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) {
//       console.error("No FTP selected, cannot open modal.");
//       return;
//     }
//     setSelectedFtp(ftp);
//     setOpen(true);
//   };

//   // const handleSubmitCronJob = async () => {
//   //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//   //     alert("Please fill in all fields");
//   //     return;
//   //   }
//   //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
//   //   const isoSchedule = formatISO(combinedDateTime);
//   //   const response = await createCron({
//   //     ftpId: selectedFtp._id,
//   //     operations,
//   //     schedule: isoSchedule,
//   //   });
//   //   if (response?.statusText !== "Created") {
//   //     alert("Error creating cron job");
//   //   } else {
//   //     setOpen(false);
//   //     setSelectedDate("");
//   //     setSelectedTime("");
//   //   }
//   // };
//   async function executeCronJob(cronJobDetails: { ftpId: any; operations: any; path: any; }) {
//     console.log("Cron job started at:", new Date().toISOString());
//     console.log("Connecting to FTP...");
//     console.log("FTP Details:", cronJobDetails.ftpId, cronJobDetails.operations);
  
//     try {
//       const ftpConnection = await connectToFtp(cronJobDetails.ftpId); // Ensure this function works
//       console.log("FTP Connection Established:", ftpConnection);
  
//       const files = await listFilesInPath(ftpConnection, cronJobDetails.path);
//       console.log("Files in FTP:", files);
  
//       const newFiles = files.filter((file: string) => file.endsWith(".xlsx") && !isFileInUploads(file));
//       console.log("New .xlsx Files Found:", newFiles);
  
//       if (newFiles.length > 0) {
//         for (const file of newFiles) {
//           console.log(`Downloading ${file}...`);
//           await downloadFile(ftpConnection, file);
//           console.log(`Download completed: ${file}`);
//         }
//       } else {
//         console.log("No new .xlsx files to download.");
//       }
  
//       console.log("Cron job execution completed.");
//     } catch (error) {
//       console.error("Error in cron job execution:", error);
//     }
//   }
  
//   const handleSubmitCronJob = async () => {
//     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//       console.error("Missing required fields for cron job.");
//       alert("Please fill in all fields");
//       return;
//     }
  
//     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
//     const isoSchedule = formatISO(combinedDateTime);
  
//     console.log("Submitting cron job with details:");
//     console.log("FTP ID:", selectedFtp._id);
//     console.log("Operations:", operations);
//     console.log("Schedule (ISO Format):", isoSchedule);
  
//     try {
//       const response = await createCron({
//         ftpId: selectedFtp._id,
//         operations,
//         schedule: isoSchedule,
//       });
  
//       console.log("Cron job creation response:", response);
  
//       if (response?.statusText !== "Created") {
//         console.error("Error creating cron job:", response);
//         alert("Error creating cron job");
//       } else {
//         console.log("Cron job successfully created.");
//         setOpen(false);
//         setSelectedDate("");
//         setSelectedTime("");
//       }
//     } catch (error) {
//       console.error("Error submitting cron job:", error);
//     }
//   };
  

//   return (
//     <Stack spacing={3}>
//       <div className="scheduleropt" style={{ display: "flex", justifyContent: "space-between", paddingRight: "120px" }}>
//         <Typography variant="h4">Matrix</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             if (ftps.length > 0) {
//               handleCreateCron(ftps[0]);
//             } else {
//               console.log("No FTPs available to open modal");
//             }
//           }}
//         >
//           Create Scheduler
//         </Button>
//       </div>

//       {/* FTP Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={modalStyle}>
//           <TextField
//             select
//             fullWidth
//             label="Select FTP"
//             value={selectedFtp?._id || ""}
//             onChange={(e) => {
//               const ftp = ftps.find((f) => f._id === e.target.value);
//               setSelectedFtp(ftp || null);
//             }}
//             margin="normal"
//           >
//             {ftps.map((ftp) => (
//               <MenuItem key={ftp._id} value={ftp._id}>
//                 {ftp.path}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField fullWidth label="Select Date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
//           <TextField fullWidth label="Select Time" type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
//               Submit
//             </Button>
//             <Button variant="outlined" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* FTP Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Path</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={ftp._id}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell>{ftp.path}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
//                     Schedule
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }

// // Apply pagination function
// function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

// // Modal style
// const modalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };
// function connectToFtp(ftpId: any) {
//   throw new Error("Function not implemented.");
// }

// function listFilesInPath(ftpConnection: any, path: any) {
//   throw new Error("Function not implemented.");
// }

// function isFileInUploads(file: string) {
//   throw new Error("Function not implemented.");
// }

// function downloadFile(ftpConnection: any, file: any) {
//   throw new Error("Function not implemented.");
// }
// "use client";

// import * as React from "react";
// import {
//   Paper,
//   Button,
//   Stack,
//   Typography,
//   Modal,
//   TextField,
//   Box,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
// } from "@mui/material";
// import { formatISO } from "date-fns";
// import { createCron } from "@/service/schedule/createCron";
// import { GetFtps } from "@/service";
// import { useUser } from "@/hooks/use-user";
// // import { formatISO } from "date-fns";

// interface Ftp {
//   _id: string;
//   ftpUser: string;
//   host: string;
//   path: string;
//   password: string;
// }

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [selectedTime, setSelectedTime] = React.useState("");
//   const [inprogress, setInprogress] = React.useState<boolean>(false);

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     setInprogress(true);
//     const ftpResponse = await GetFtps();
//     if (ftpResponse?.error) {
//       toast.setToast({
//         isOpen: true,
//         message: ftpResponse.error,
//         type: "error",
//       });
//       setInprogress(false);
//       return setFtps([]);
//     }
//     setFtps(ftpResponse?.ftps?.data as Ftp[]);
//     setInprogress(false);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) {
//       console.error("No FTP selected, cannot open modal.");
//       return;
//     }
//     setSelectedFtp(ftp);
//     setOpen(true);
//   };

//   const handleSubmitCronJob = async () => {
//     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//       console.error("Missing required fields for cron job.");
//       alert("Please fill in all fields");
//       return;
//     }

//     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
//     const isoSchedule = formatISO(combinedDateTime);

//     console.log("Submitting cron job with details:");
//     console.log("FTP ID:", selectedFtp._id);
//     console.log("Operations:", operations);
//     console.log("Schedule (ISO Format):", isoSchedule);

//     try {
//       const response = await createCron({
//         ftpId: selectedFtp._id,
//         operations,
//         schedule: isoSchedule,
//       });

//       console.log("Cron job creation response:", response);

//       if (response?.statusText !== "Created") {
//         console.error("Error creating cron job:", response);
//         alert("Error creating cron job");
//       } else {
//         console.log("Cron job successfully created.");
//         setOpen(false);
//         setSelectedDate("");
//         setSelectedTime("");
//       }
//     } catch (error) {
//       console.error("Error submitting cron job:", error);
//     }
//   };

// // const executeCronJob = async (selectedFtp: Ftp) => {
// //   try {
// //     const response = await fetch("/api/ftp", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ ftpDetails: selectedFtp, operation: "list" }),
// //     });

// //     const data = await response.json();
// //     console.log("FTP Response:", data);
// //   } catch (error) {
// //     console.error("Error in FTP operation:", error);
// //   }
// // };
// const executeCronJob = async (selectedFtp: Ftp) => {
//   try {
//     const sanitizedFtp = {
//       _id: selectedFtp._id,
//       ftpUser: selectedFtp.ftpUser,
//       host: selectedFtp.host,
//       path: selectedFtp.path,
//       password: selectedFtp.password, // Only include required fields
//       operations,
//         schedule: isoSchedule,
//     };

//     const response = await fetch("http://localhost:4041/api/v1/cron/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ftpDetails: sanitizedFtp, operation: "list" }),
//     });

//     const data = await response.json();
//     console.log("FTP Response:", data);
//   } catch (error) {
//     console.error("Error in FTP operation:", error);
//   }
// };




//   return (
//     <Stack spacing={3}>
//       <div className="scheduleropt" style={{ display: "flex", justifyContent: "space-between", paddingRight: "120px" }}>
//         <Typography variant="h4">Matrix</Typography>
//         <Button style={{display: 'none'}}   
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             if (ftps.length > 0) {
//               handleCreateCron(ftps[0]);
//             } else {
//               console.log("No FTPs available to open modal");
//             }
//           }}
//         >
//           Create Scheduler
//         </Button>
//       </div>

//       {/* FTP Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={modalStyle}>
//           <TextField
//             select
//             fullWidth
//             label="Select FTP"
//             value={selectedFtp?._id || ""}
//             onChange={(e) => {
//               const ftp = ftps.find((f) => f._id === e.target.value);
//               setSelectedFtp(ftp || null);
//             }}
//             margin="normal"
//           >
//             {ftps.map((ftp) => (
//               <MenuItem key={ftp._id} value={ftp._id}>
//                 {ftp.path}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField fullWidth  type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
//           <TextField fullWidth  type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
//               Submit
//             </Button>
//             <Button variant="outlined" onClick={executeCronJob}>
//               Execute Now
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* FTP Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Path</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={ftp._id}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell>{ftp.path}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
//                     Schedule
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }
// function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

// // Modal style
// const modalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// Mock FTP functions
// async function connectToFtp(ftpId: string) {
//   return `Connected to FTP: ${ftpId}`;
// }

// async function listFilesInPath(ftpConnection: string, path: string) {
//   return ["file1.xlsx", "file2.xlsx"];
// }

// function isFileInUploads(file: string) {
//   return false;
// }

// async function downloadFile(ftpConnection: string, file: string) {
//   return `Downloaded: ${file}`;
// }

// "use client";

// import * as React from "react";
// import {
//   Paper,
//   Button,
//   Stack,
//   Typography,
//   Modal,
//   TextField,
//   Box,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
// } from "@mui/material";
// import { formatISO } from "date-fns";
// import { createCron } from "@/service/schedule/createCron";
// import { GetFtps } from "@/service";
// import { useUser } from "@/hooks/use-user";
// // import {Toast}

// interface Ftp {
//   _id: string;
//   ftpUser: string;
//   host: string;
//   path: string;
//   password: string;
// }

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [selectedTime, setSelectedTime] = React.useState("");
//   const [inprogress, setInprogress] = React.useState<boolean>(false);
//   enum ToastType {
//     SUCCESS = "success",
//     ERROR = "error",
//     INFO = "info",
//     WARNING = "warning"
//   }
  

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     setInprogress(true);
//     const ftpResponse = await GetFtps();
//     if (ftpResponse?.error) {
//       toast.setToast({ isOpen: true, message: ftpResponse.error, type: ToastType.ERROR  });
//       setInprogress(false);
//       return setFtps([]);
//     }
//     setFtps(ftpResponse?.ftps?.data as Ftp[]);
//     setInprogress(false);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) return;
//     setSelectedFtp(ftp);
//     setOpen(true);
//   };

//   // const handleSubmitCronJob = async () => {
//   //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//   //     alert("Please fill in all fields");
//   //     return;
//   //   }

//   //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
//   //   const isoSchedule = formatISO(combinedDateTime);

//   //   try {
//   //     const response = await createCron({ ftpId: selectedFtp._id, operations, schedule: isoSchedule });
//   //     if (response?.statusText !== "Created") {
//   //       alert("Error creating cron job");
//   //     } else {
//   //       setOpen(false);
//   //       setSelectedDate("");
//   //       setSelectedTime("");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting cron job:", error);
//   //   }
//   // };
//   const handleSubmitCronJob = async () => {
//     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//       alert("Please fill in all fields");
//       return;
//     }
  
//     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`); // Ensure seconds are included
//     if (isNaN(combinedDateTime.getTime())) {
//       alert("Invalid date/time selected.");
//       return;
//     }
  
//     const isoSchedule = formatISO(combinedDateTime); // Properly formatted ISO date
  
//     try {
//       const response = await createCron({
//         ftpId: selectedFtp._id,
//         operations,
//         schedule: isoSchedule, // Correctly formatted schedule
//       });
  
//       if (response?.statusText !== "Created") {
//         alert("Error creating cron job");
//       } else {
//         setOpen(false);
//         setSelectedDate("");
//         setSelectedTime("");
//       }
//     } catch (error) {
//       console.error("Error submitting cron job:", error);
//     }
//   };
  

//   // const executeCronJob = async () => {
//   //   if (!selectedFtp) return;
//   //   try {
//   //     const response = await fetch("http://localhost:4041/api/v1/cron/create", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ ftpDetails: selectedFtp, operation: "list" }),
//   //     });

//   //     const data = await response.json();
//   //     console.log("FTP Response:", data);
//   //   } catch (error) {
//   //     console.error("Error in FTP operation:", error);
//   //   }
//   // };
//   // const executeCronJob = async (selectedFtp: Ftp) => {
//   //   if (!selectedFtp) {
//   //     console.error("No FTP selected");
//   //     return;
//   //   }
  
//   //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
//   //   if (isNaN(combinedDateTime.getTime())) {
//   //     alert("Invalid date/time for execution.");
//   //     return;
//   //   }
  
//   //   const isoSchedule = formatISO(combinedDateTime);
//   const executeCronJob = async (selectedFtp: Ftp) => {
//     if (!selectedFtp) {
//       alert("No FTP selected");
//       return;
//     }
  
//     try {
//       const response = await fetch(`http://178.79.133.148:4040/api/v1/cron/ftp/${selectedFtp._id}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
  
//       const data = await response.json();
//       console.log("FTP Response:", data);
//     } catch (error) {
//       console.error("Error in FTP operation:", error);
//     }
//   };
  
  
//     try {
//       const response = await fetch("http://178.79.133.148:4040/api/v1/cron/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ftpDetails: {
//             _id: selectedFtp._id,
//             ftpUser: selectedFtp.ftpUser,
//             host: selectedFtp.host,
//             path: selectedFtp.path,
//             password: selectedFtp.password,
//           },
//           operations,
//           schedule: isoSchedule, // Ensure correct schedule format
//         }),
//       });
//       // const response = await fetch("http://178.79.133.148:4041/api/v1/cron/create", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({
//       //     ftpId: selectedFtp._id,
//       //     operations,
//       //     schedule: isoSchedule,
//       //   }),
//       // });
      
  
//       const data = await response.json();
//       console.log("FTP Response:", data);
//     } catch (error) {
//       console.error("Error in FTP operation:", error);
//     }
//   };
  

//   return (
//     <Stack spacing={3}>
//       <div className="scheduleropt" style={{ display: "flex", justifyContent: "space-between", paddingRight: "120px" }}>
//         <Typography variant="h4">Matrix</Typography>
//       </div>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={modalStyle}>
//           <TextField
//             select
//             fullWidth
//             label="Select FTP"
//             value={selectedFtp?._id || ""}
//             onChange={(e) => {
//               const ftp = ftps.find((f) => f._id === e.target.value);
//               setSelectedFtp(ftp || null);
//             }}
//             margin="normal"
//           >
//             {ftps.map((ftp) => (
//               <MenuItem key={ftp._id} value={ftp._id}>
//                 {ftp.path}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField fullWidth type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
//           <TextField fullWidth type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
//               Submit
//             </Button>
//             {/* <Button variant="outlined" onClick={executeCronJob}>
//               Execute Now
//             </Button> */}
//             <Button variant="outlined" onClick={() => (executeCronJob)}>
//   Execute Now
// </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Path</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={ftp._id}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell>{ftp.path}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
//                     Schedule
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }

// function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

// const modalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };
// "use client";
// import * as React from "react";
// import {
//   Paper,
//   Button,
//   Stack,
//   Typography,
//   Modal,
//   TextField,
//   Box,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
// } from "@mui/material";
// import { formatISO } from "date-fns";
// import { createCronJob, executeCron } from "@/service/schedule/createCron";
// import { GetFtps } from "@/service";
// import { useUser } from "@/hooks/use-user";

// interface Ftp {
//   _id: string;
//   ftpUser: string;
//   host: string;
//   path: string;
//   password: string;
// }

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [selectedTime, setSelectedTime] = React.useState("");
//   const [inprogress, setInprogress] = React.useState<boolean>(false);

//   enum ToastType {
//     SUCCESS = "success",
//     ERROR = "error",
//     INFO = "info",
//     WARNING = "warning",
//   }

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     setInprogress(true);
//     try {
//       const ftpResponse = await GetFtps();
//       if (ftpResponse?.error) {
//         toast.setToast({ isOpen: true, message: ftpResponse.error, type: ToastType.ERROR });
//         setFtps([]);
//       } else {
//         setFtps(ftpResponse?.ftps?.data as Ftp[]);
//       }
//     } catch (error) {
//       console.error("Error fetching FTPs:", error);
//     }
//     setInprogress(false);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) return;
//     setSelectedFtp(ftp);
//     setOpen(true);
//   };

//   const handleSubmitCronJob = async () => {
//     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//       alert("Please fill in all fields");
//       return;
//     }

//     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
//     if (isNaN(combinedDateTime.getTime())) {
//       alert("Invalid date/time selected.");
//       return;
//     }

//     const isoSchedule = formatISO(combinedDateTime);

//     try {
//       const response = await createCronJob({
//         ftpId: selectedFtp._id,
//         operations,
//         schedule: isoSchedule,
//       });

//       if (response?.statusText !== "Created") {
//         alert("Error creating cron job");
//       } else {
//         setOpen(false);
//         setSelectedDate("");
//         setSelectedTime("");
//         toast.setToast({ isOpen: true, message: "Cron job created successfully!", type: ToastType.SUCCESS });
//       }
//     } catch (error) {
//       console.error("Error submitting cron job:", error);
//       toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
//     }
//   };

//   const executeCronJob = async (ftp: Ftp | null) => {
//     if (!ftp) {
//       alert("No FTP selected");
//       return;
//     }

//     try {
//       const response = await executeCron(ftp.ftpUser);

//       if (typeof response !== "object") {
//         console.error("Unexpected response format:", response);
//         throw new Error("Server did not return JSON");
//       }

//       console.log("FTP Response:", response);
//     } catch (error) {
//       console.error("Error executing FTP operation:", error);
//     }
//   };

//   return (
//     <Stack spacing={3}>
//       <div className="scheduleropt" style={{ display: "flex", justifyContent: "space-between", paddingRight: "120px" }}>
//         <Typography variant="h4">Matrix</Typography>
//       </div>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, width: 400, margin: "auto", mt: "20vh" }}>
//           <TextField
//             select
//             fullWidth
//             label="Select FTP"
//             value={selectedFtp?.ftpUser || ""}
//             onChange={(e) => {
//               const ftp = ftps.find((f) => f.ftpUser === e.target.value);
//               setSelectedFtp(ftp || null);
//             }}
//             margin="normal"
//           >
//             {ftps.map((ftp) => (
//               <MenuItem key={ftp.ftpUser} value={ftp.ftpUser}>
//                 {ftp.path}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField fullWidth type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
//           <TextField fullWidth type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
//               Submit
//             </Button>
//             <Button variant="outlined" onClick={() => executeCronJob(selectedFtp)}>
//               Execute Now
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Path</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={JSON.stringify(ftp.ftpUser)}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell>{ftp.path}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
//                     Schedule
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }

// function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
//   if (!Array.isArray(rows)) return []; // Ensure it's always an array
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

// "use client";
// import * as React from "react";
// import {
//   Paper,
//   Button,
//   Stack,
//   Typography,
//   Modal,
//   TextField,
//   Box,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
// } from "@mui/material";
// import { formatISO } from "date-fns";
// import { createCronJob, executeCron } from "@/service/schedule/createCron";
// import { GetFtps } from "@/service";
// import { useUser } from "@/hooks/use-user";

// interface Ftp {
//   _id: string;
//   ftpUser: string;
//   host: string;
//   path: string;
//   password: string;
// }

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [selectedTime, setSelectedTime] = React.useState("");
//   const [inProgress, setInProgress] = React.useState<boolean>(false);
//   const [loading, setLoading] = React.useState<boolean>(false);

//   enum ToastType {
//     SUCCESS = "success",
//     ERROR = "error",
//     INFO = "info",
//     WARNING = "warning",
//   }

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     setInProgress(true);
//     try {
//       const ftpResponse = await GetFtps();
//       if (ftpResponse?.error) {
//         toast.setToast({ isOpen: true, message: ftpResponse.error, type: ToastType.ERROR });
//         setFtps([]);
//       } else {
//         setFtps(ftpResponse?.ftps?.data as Ftp[]);
//       }
//     } catch (error) {
//       console.error("Error fetching FTPs:", error);
//       toast.setToast({ isOpen: true, message: "Failed to fetch FTPs", type: ToastType.ERROR });
//     }
//     setInProgress(false);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) return;
//     setSelectedFtp(selectedFtp);
//     setOpen(true);
//   };

//   // const handleSubmitCronJob = async () => {
//   //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//   //     toast.setToast({ isOpen: true, message: "Please fill in all fields", type: ToastType.WARNING });
//   //     return;
//   //   }

//   //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
//   //   if (isNaN(combinedDateTime.getTime())) {
//   //     toast.setToast({ isOpen: true, message: "Invalid date/time selected.", type: ToastType.ERROR });
//   //     return;
//   //   }

//   //   const isoSchedule = formatISO(combinedDateTime);
//   //   setLoading(true);

//   //   try {
//   //     const response = await createCronJob({
//   //       ftpId: selectedFtp._id,
//   //       operations,
//   //       schedule: isoSchedule,
//   //     });

//   //     if (response?.statusText !== "Created") {
//   //       toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
//   //     } else {
//   //       setOpen(false);
//   //       setSelectedDate("");
//   //       setSelectedTime("");
//   //       toast.setToast({ isOpen: true, message: "Cron job created successfully!", type: ToastType.SUCCESS });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting cron job:", error);
//   //     toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
//   //   }
//   //   setLoading(false);
//   // };
//   const handleSubmitCronJob = async () => {
//   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//     toast.setToast({ isOpen: true, message: "Please fill in all fields", type: ToastType.WARNING });
//     return;
//   }

//   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
//   if (isNaN(combinedDateTime.getTime())) {
//     toast.setToast({ isOpen: true, message: "Invalid date/time selected.", type: ToastType.ERROR });
//     return;
//   }

//   const isoSchedule = formatISO(combinedDateTime);
//   setLoading(true);

//   try {
//     console.log("Selected FTP Object:", selectedFtp); // Debugging
//     console.log("Selected FTP ID:", selectedFtp?._id); // Debugging

//     const response = await createCronJob({
//       ftpId: selectedFtp?._id?.toString().trim(), // Ensure it's a valid string
//       operations,
//       schedule: isoSchedule,
//     });

//     if (response?.statusText !== "Created") {
//       toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
//     } else {
//       setOpen(false);
//       setSelectedDate("");
//       setSelectedTime("");
//       toast.setToast({ isOpen: true, message: "Cron job created successfully!", type: ToastType.SUCCESS });
//     }
//   } catch (error) {
//     console.error("Error submitting cron job:", error);
//     toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
//   }
//   setLoading(false);
// };


//   const executeCronJob = async (ftp: Ftp | null) => {
//     if (!ftp) {
//       toast.setToast({ isOpen: true, message: "No FTP selected", type: ToastType.WARNING });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await executeCron(ftp.ftpUser);

//       if (typeof response !== "object") {
//         console.error("Unexpected response format:", response);
//         throw new Error("Server did not return JSON");
//       }

//       console.log("FTP Response:", response);
//       toast.setToast({ isOpen: true, message: "Cron executed successfully!", type: ToastType.SUCCESS });
//     } catch (error) {
//       console.error("Error executing FTP operation:", error);
//       toast.setToast({ isOpen: true, message: "Error executing cron job", type: ToastType.ERROR });
//     }
//     setLoading(false);
//   };

//   return (
//     <Stack spacing={3}>
//       <div className="scheduleropt" style={{ display: "flex", justifyContent: "space-between", paddingRight: "120px" }}>
//         <Typography variant="h4">Matrix</Typography>
//       </div>

//       <Modal open={open} onClose={() => setOpen(false)}>
//   <Box
//     sx={{
//       p: 3,
//       bgcolor: "background.paper",
//       borderRadius: 2,
//       width: 400,
//       margin: "auto",
//       mt: "20vh",
//     }}
//   >
//     <TextField
//       select
//       fullWidth
//       label="Select FTP"
//       value={selectedFtp?.ftpUser || ""}
//       onChange={(e) => {
//         console.log("Dropdown value selected:", e.target.value); // Debugging

//         if (!Array.isArray(ftps) || ftps.length === 0) {
//           console.error("FTPs list is empty or undefined");
//           return;
//         }

//         const ftp = ftps.find((f) => f.ftpUser === e.target.value);

//         if (!ftp) {
//           console.warn("No matching FTP found for:", e.target.value);
//         }

//         setSelectedFtp(ftp || null);
//       }}
//       margin="normal"
//     >
//       {Array.isArray(ftps) && ftps.length > 0 ? (
//         ftps.map((ftp) => (
//           <MenuItem key={ftp.ftpUser} value={ftp.ftpUser}>
//             {ftp.path}
//           </MenuItem>
//         ))
//       ) : (
//         <MenuItem disabled>No FTPs available</MenuItem>
// )}

//           </TextField>
//           <TextField fullWidth type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
//           <TextField fullWidth type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob} disabled={loading}>
//               {loading ? "Scheduling..." : "Submit"}
//             </Button>
//             <Button style={{display: 'none'}} variant="outlined" onClick={() => executeCronJob(selectedFtp)} disabled={loading}>
//               {loading ? "Executing..." : "Execute Now"}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Path</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={ftp.ftpUser}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell>{ftp.path}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
//                     Schedule
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }
// "use client";
// import * as React from "react";
// import {
//   Paper,
//   Button,
//   Stack,
//   Typography,
//   Modal,
//   TextField,
//   Box,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
// } from "@mui/material";
// import { formatISO } from "date-fns";
// import { createCronJob, executeCron } from "@/service/schedule/createCron";
// import { GetFtps } from "@/service";
// import { useUser } from "@/hooks/use-user";

// interface Ftp {
//   _id: string;
//   ftpUser: string;
//   host: string;
//   path: string;
//   password: string;
// }

// export default function Page(): React.JSX.Element {
//   const { toast } = useUser();
//   const [ftps, setFtps] = React.useState<Ftp[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
//   const [operations, setOperations] = React.useState("download");
//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [selectedTime, setSelectedTime] = React.useState("");
//   const [inProgress, setInProgress] = React.useState<boolean>(false);
//   const [loading, setLoading] = React.useState<boolean>(false);

//   enum ToastType {
//     SUCCESS = "success",
//     ERROR = "error",
//     INFO = "info",
//     WARNING = "warning",
//   }

//   const page = 0;
//   const rowsPerPage = 10;
//   const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

//   const getFtps = async () => {
//     setInProgress(true);
//     try {
//       const ftpResponse = await GetFtps();
//       if (ftpResponse?.error) {
//         toast.setToast({ isOpen: true, message: ftpResponse.error, type: ToastType.ERROR });
//         setFtps([]);
//       } else {
//         setFtps(ftpResponse?.ftps?.data as Ftp[]);
//       }
//     } catch (error) {
//       console.error("Error fetching FTPs:", error);
//       toast.setToast({ isOpen: true, message: "Failed to fetch FTPs", type: ToastType.ERROR });
//     }
//     setInProgress(false);
//   };

//   React.useEffect(() => {
//     getFtps();
//   }, []);

  // const handleCreateCron = (ftp: Ftp) => {
  //   if (!ftp) return;
  //   setSelectedFtp(selectedFtp);
  //   setOpen(true);
  // };

  // const handleSubmitCronJob = async () => {
  //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
  //     toast.setToast({ isOpen: true, message: "Please fill in all fields", type: ToastType.WARNING });
  //     return;
  //   }

  //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
  //   if (isNaN(combinedDateTime.getTime())) {
  //     toast.setToast({ isOpen: true, message: "Invalid date/time selected.", type: ToastType.ERROR });
  //     return;
  //   }

  //   const isoSchedule = formatISO(combinedDateTime);
  //   setLoading(true);

  //   try {
  //     console.log("Selected FTP Object:", selectedFtp);
  //     console.log("Selected FTP ID:", selectedFtp?._id);

  //     const response = await createCronJob({
  //       ftpId: selectedFtp?._id?.toString().trim(),
  //       operations,
  //       schedule: isoSchedule,
  //     });

  //     if (response?.statusText !== "Created") {
  //       toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
  //     } else {
  //       setOpen(false);
  //       setSelectedDate("");
  //       setSelectedTime("");
  //       toast.setToast({ isOpen: true, message: "Cron job created successfully!", type: ToastType.SUCCESS });
  //     }
  //   } catch (error) {
  //     console.error("Error submitting cron job:", error);
  //     toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
  //   }
  //   setLoading(false);
  // };
//   const handleCreateCron = (ftp: Ftp) => {
//     if (!ftp) return;
//     setSelectedFtp(ftp); // Fix: Use the correct ftp object
//     setOpen(true);
//   };
  
//   const handleSubmitCronJob = async () => {
//     if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
//       toast.setToast({ isOpen: true, message: "Please fill in all fields", type: ToastType.WARNING });
//       return;
//     }
  
//     const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
//     if (isNaN(combinedDateTime.getTime())) {
//       toast.setToast({ isOpen: true, message: "Invalid date/time selected.", type: ToastType.ERROR });
//       return;
//     }
  
//     const isoSchedule = formatISO(combinedDateTime);
//     setLoading(true);
  
//     try {
//       console.log("Selected FTP Object:", selectedFtp);
//       console.log("Selected FTP ID:", selectedFtp?._id);
  
//       // Ensure the _id is a proper string
//       const ftpId = typeof selectedFtp._id === "object" && selectedFtp._id?.toString
//         ? selectedFtp._id.toString()
//         : selectedFtp._id;
  
//       console.log("Formatted FTP ID:", ftpId);
  
//       const response = await createCronJob({
//         ftpId: ftpId.trim(),
//         operations,
//         schedule: isoSchedule,
//       });
  
//       if (response?.statusText !== "Created") {
//         toast.setToast({ isOpen: true, message: `Error creating cron job: ${response?.statusText}`, type: ToastType.ERROR });
//       } else {
//         setOpen(false);
//         setSelectedDate("");
//         setSelectedTime("");
//         toast.setToast({ isOpen: true, message: "Cron job created successfully!", type: ToastType.SUCCESS });
//       }
//     } catch (error) {
//       console.error("Error submitting cron job:", error);
//       toast.setToast({ isOpen: true, message: `Error creating cron job: ${error.message}`, type: ToastType.ERROR });
//     }
  
//     setLoading(false);
//   };
  
//   return (
//     <Stack spacing={3}>
//       <Typography variant="h4">Matrix</Typography>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, width: 400, margin: "auto", mt: "20vh" }}>
//           <TextField
//             select
//             fullWidth
//             label="Select FTP"
//             value={selectedFtp?.ftpUser || ""}
//             onChange={(e) => {
//               const ftp = ftps.find((f) => f.ftpUser === e.target.value);
//               setSelectedFtp(ftp || null);
//             }}
//             margin="normal"
//           >
//             {ftps.length > 0 ? (
//               ftps.map((ftp) => (
//                 <MenuItem key={ftp.ftpUser} value={ftp.ftpUser}>
//                   {ftp.path}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No FTPs available</MenuItem>
//             )}
//           </TextField>
//           <TextField fullWidth type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
//           <TextField fullWidth type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
//           <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmitCronJob} disabled={loading}>
//               {loading ? "Scheduling..." : "Submit"}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Name</TableCell>
//               <TableCell>Host</TableCell>
//               <TableCell>Path</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedFtps.map((ftp) => (
//               <TableRow key={ftp.ftpUser}>
//                 <TableCell>{ftp.ftpUser}</TableCell>
//                 <TableCell>{ftp.host}</TableCell>
//                 <TableCell>{ftp.path}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
//                     Schedule
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Stack>
//   );
// }
"use client";
import * as React from "react";
import {
  Paper,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from "@mui/material";
import { formatISO } from "date-fns";
import { createCronJob, executeCron } from "@/service/schedule/createCron";
import { GetFtps } from "@/service";
import { useUser } from "@/hooks/use-user";

interface Ftp {
  _id: string;
  ftpUser: string;
  host: string;
  path: string;
  password: string;
}

export default function Page(): React.JSX.Element {
  const { toast } = useUser();
  const [ftps, setFtps] = React.useState<Ftp[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
  const [operations, setOperations] = React.useState("download");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [inProgress, setInProgress] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
  }

  const page = 0;
  const rowsPerPage = 10;
  const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

  const getFtps = async () => {
    setInProgress(true);
    try {
      const ftpResponse = await GetFtps();
      if (ftpResponse?.error) {
        toast.setToast({ isOpen: true, message: ftpResponse.error, type: ToastType.ERROR });
        setFtps([]);
      } else {
        setFtps(ftpResponse?.ftps?.data as Ftp[]);
      }
    } catch (error) {
      console.error("Error fetching FTPs:", error);
      toast.setToast({ isOpen: true, message: "Failed to fetch FTPs", type: ToastType.ERROR });
    }
    setInProgress(false);
  };

  React.useEffect(() => {
    getFtps();
  }, []);

  const handleCreateCron = (ftp: Ftp) => {
    if (!ftp) return;
    setSelectedFtp(ftp);
    setOpen(true);
  };

  const handleSubmitCronJob = async () => {
    if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
      toast.setToast({ isOpen: true, message: "Please fill in all fields", type: ToastType.WARNING });
      return;
    }

    const combinedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
    if (isNaN(combinedDateTime.getTime())) {
      toast.setToast({ isOpen: true, message: "Invalid date/time selected.", type: ToastType.ERROR });
      return;
    }

    const isoSchedule = formatISO(combinedDateTime);
    setLoading(true);

    try {
      console.log("Selected FTP Object:", selectedFtp);
      console.log("Selected FTP ID:", selectedFtp?._id);

      const response = await createCronJob({
        ftpId: String(selectedFtp?._id).trim(), // Fixed toString issue
        operations: Array.isArray(operations) ? operations : [operations],
        schedule: isoSchedule,
      });

      if (response?.statusText !== "Created") {
        toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
      } else {
        setOpen(false);
        setSelectedDate("");
        setSelectedTime("");
        toast.setToast({ isOpen: true, message: "Cron job created successfully!", type: ToastType.SUCCESS });
      }
    } catch (error) {
      console.error("Error submitting cron job:", error);
      toast.setToast({ isOpen: true, message: "Error creating cron job", type: ToastType.ERROR });
    }
    setLoading(false);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Matrix</Typography>

      {/* Cron Job Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, width: 400, margin: "auto", mt: "20vh" }}>
          <TextField
            select
            fullWidth
            label="Select FTP"
            value={selectedFtp?.ftpUser || ""}
            onChange={(e) => {
              const ftp = ftps.find((f) => f.ftpUser === e.target.value);
              setSelectedFtp(ftp || null);
            }}
            margin="normal"
          >
            {ftps.length > 0 ? (
              ftps.map((ftp) => (
                <MenuItem key={ftp.ftpUser} value={ftp.ftpUser}>
                  {ftp.path}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No FTPs available</MenuItem>
            )}
          </TextField>
          <TextField fullWidth type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} margin="normal" />
          <TextField fullWidth type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} margin="normal" />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmitCronJob} disabled={loading}>
              {loading ? "Scheduling..." : "Submit"}
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* FTP Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFtps.map((ftp) => (
              <TableRow key={ftp.ftpUser}>
                <TableCell>{ftp.ftpUser}</TableCell>
                <TableCell>{ftp.host}</TableCell>
                <TableCell>{ftp.path}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
                    Schedule
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
  return Array.isArray(rows) ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
}
