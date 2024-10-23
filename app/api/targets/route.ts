import { NextResponse } from "next/server";
import targetsData from "@/data/targets.json";
export async function GET() {
  return NextResponse.json(targetsData);
}

// Handler for GET requests
// export async function GET() {
//   try {
//     const res = await pool.query("SELECT * FROM targets");
//     return NextResponse.json(res.rows);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error fetching targets" },
//       { status: 500 }
//     );
//   }
// }

// // Handler for PUT requests
// export async function PUT(req: Request) {
//   const { id, newStatus } = await req.json();

//   // Validate status
//   if (!["Passed", "Cold", "Active", "Hot", "Closed"].includes(newStatus)) {
//     return NextResponse.json(
//       { message: "Invalid status value" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch current status
//     const currentTargetRes = await pool.query(
//       "SELECT pipeline_status FROM targets WHERE id = $1",
//       [id]
//     );
//     if (currentTargetRes.rowCount === 0) {
//       return NextResponse.json(
//         { message: "Target not found" },
//         { status: 404 }
//       );
//     }

//     const currentStatus = currentTargetRes.rows[0].pipeline_status;

//     // Update the target status
//     await pool.query(
//       "UPDATE targets SET pipeline_status = $1, last_updated = $2 WHERE id = $3",
//       [newStatus, new Date(), id]
//     );

//     // Log the change in audit log
//     await pool.query(
//       "INSERT INTO audit_log (target_id, old_status, new_status) VALUES ($1, $2, $3)",
//       [id, currentStatus, newStatus]
//     );

//     return NextResponse.json({ message: "Status updated successfully" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
