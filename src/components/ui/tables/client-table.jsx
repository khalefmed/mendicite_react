// /* eslint-disable react/prop-types */
// import edit from "../../assets/icons/edit.svg";
// import deleteIcon from "../../assets/icons/delete.svg";
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import ClientInfosCard from "./common/modals/clientInfosCard";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useTranslation } from "react-i18next";
// import { useMemo } from "react";
// import DeleteModal from "../common/deleteModal";
// // import { axiosApi } from "../../../lib/api";
// import ClientUpdateCard from "./common/modals/clientUpdateCard";
// import ClientEtatCompte from "./common/modals/clientEtatCompte";

// export default function ClientDataTable({ data }) {
//   const { t } = useTranslation();

//   const role = window.localStorage.getItem("role");

//   const deleteItem = async id => {
//     try {
//       let access_token = window.localStorage.getItem("access-token");
//       console.log(id);
//       const response = await axiosApi.delete(`clients/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });
//       window.location.reload();
//     } catch (error) {
//       console.error("Failed to fetch clients:", error);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "nom_client",
//         header: () => <div className="text-center">{t("nom")}</div>,
//         // cell: ({ row }) => {
//         //   return <div className="text-center font-medium">{row}</div>;
//         // },
//       },
//       {
//         accessorKey: "type_client",
//         header: () => <div className="text-center">{t("type")}</div>,
//         id: "type",
//         cell: ({ row }) => (
//           <div className="mx-auto">
//             {row.original.type_client === "personne" ? (
//               <h1>{t("UnePersonne")} </h1>
//             ) : (
//               <h1>{t("UneEntreprise")} </h1>
//             )}
//           </div>
//         ),
//       },
//       {
//         accessorKey: "email_client",
//         header: () => <div className="text-center">{t("email")}</div>,
//       },
//       {
//         accessorKey: "telephone_client",
//         header: () => <div className="text-center">{t("telephone")}</div>,
//         cell: ({ row }) => {
//           return <div className="text-center" dir="ltr">{row.original.telephone_client}</div>;
//         },
//       },
//       {
//         accessorKey: "options",
//         header: () => <div className="text-center">{t("action")}</div>,

//         id: "actions",
//         cell: ({ row }) => (
//           <div className=" flex flex-row items-centeralign-center justify-center gap-1">
//             <ClientInfosCard row={row.original} />
//             <ClientEtatCompte id={row.original.id}/>
//             {role == "chefAgence" || role == "admin" || role == "superAdmin" ? (
//               <ClientUpdateCard row={row.original} />
//             ) : (
//               <></>
//             )}
//             {role == "chefAgence" || role == "admin" || role == "superAdmin" ? (
//               <DeleteModal
//                 label={t("deleteLabel")}
//                 deleteItem={() => deleteItem(row.original.id)}
//               />
//             ) : (
//               <></>
//             )}
//           </div>
//         ),
//       },
//     ],
//     [t, role]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//   });

//   return (
//     <div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map(headerGroup => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map(header => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map(row => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}>
//                   {row.getVisibleCells().map(cell => (
//                     <TableCell className="text-center" key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
