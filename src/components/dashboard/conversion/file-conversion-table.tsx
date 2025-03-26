'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DrawIcon from '@mui/icons-material/Draw';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}
interface Vendor {
  firstName: string;
  lastName: string;
  companyName:string;
  contactNumber:number;
  companyAddress:string;
  email: string;
  createdAt:  Date;
  status: string;
  logs: string;
}
interface User {
  _id: string; 
  firstName: string;
  companyName:string;
  contactNumber:number;
  companyAddress:string;
  lastName: string;
  email: string;
  createdAt: Date;
  logs: string;
}
export interface ConvertedFile {
  [x: string]: any;
  _id: string;
  filePath: string;
  conversionType: string;
  vendor: Vendor;
  convertedBy: User;
  status: Vendor;
  logs: Vendor;
  createdBy: User;
  createdAt: Date;
}

interface VendorsTableProps {
  count?: number;
  page?: number;
  rows?: ConvertedFile[];
  vendor?: Vendor[];
  user?: User[];
  rowsPerPage?: number;
}

export function FileConversionTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: VendorsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((Ftp) => Ftp._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const downloadFileFromBuffer = (url: string) => {
    console.log('url', url);
    const link = document.createElement('a');
    link.href = url;
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              {/* <TableCell>User Name</TableCell> */}
              {/* <TableCell>User Name</TableCell> */}
              <TableCell>Converted By</TableCell>
              <TableCell>Last Uploaded Date</TableCell>
              <TableCell>Logs</TableCell>
              {/* <TableCell>Action</TableCell> */}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              const isSelected = selected?.has(row._id);
              console.log("Raw createdAt:", row?.createdAt, "Type:", typeof row?.createdAt);
              return (
                <TableRow hover key={row?.filePath} selected={isSelected}>
                  {/* <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row?.createdBy?.firstName} {row?.createdBy?.lastName}</Typography>
                    </Stack>
                  </TableCell> */}
                  {/* <TableCell>{row?.createdBy?.companyName}</TableCell> */}
                  <TableCell>Admin</TableCell>
                  
                  <TableCell>
  {row?.createdAt && !isNaN(new Date(row.createdAt).getTime()) 
    ? new Date(row.createdAt).toLocaleString() 
    : "N/A"}
</TableCell>
                  {/* <TableCell> {row?.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A"}</TableCell> */}
                  {/* <TableCell>Active</TableCell> */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Avatar sx={{ cursor: 'pointer', background: '#4E36F5' }}> <a style= {{
                        // make default stle none
                        textDecoration: 'none',
                        color: 'white',
                        
                      }} href={process?.env?.NEXT_PUBLIC_DOWNLOAD_CONVERTED_URL_LOCAL + "/" + row?.filePath} target='_blank'><CloudDownloadIcon /></a> </Avatar>
                    </Stack>
                  </TableCell>
                  <TableCell>Successful</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
