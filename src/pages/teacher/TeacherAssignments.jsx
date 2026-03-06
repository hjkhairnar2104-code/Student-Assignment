import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTeacherAssignments,
    deleteAssignment,
} from "../../store/assignmentSlice";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FilterListIcon from "@mui/icons-material/FilterList";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SubjectIcon from "@mui/icons-material/Subject";
import DescriptionIcon from "@mui/icons-material/Description";

import {
    Modal,
    Backdrop,
    Box,
    Button,
    Typography,
    CircularProgress,
    Paper,
    Tooltip,
    Fade,
    Chip,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";

export default function TeacherAssignments() {
    const dispatch = useDispatch();

    const { teacherAssignments, loading, error } = useSelector(
        (state) => state.assignment
    );

    const [selectedYear, setSelectedYear] = useState("ALL");
    const [open, setOpen] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

    useEffect(() => {
        dispatch(fetchTeacherAssignments());
    }, [dispatch]);

    const openDeleteModal = (assignmentId) => {
        setSelectedAssignmentId(assignmentId);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setSelectedAssignmentId(null);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteAssignment(selectedAssignmentId)).unwrap();
            closeModal();
        } catch {
            alert("Failed to delete assignment");
        }
    };

    const yearOptions = ["ALL", "1", "2", "3", "4"];

    const filteredAssignments =
        selectedYear === "ALL"
            ? teacherAssignments
            : teacherAssignments.filter((a) => String(a.year) === selectedYear);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header (unchanged) */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                        <InsertDriveFileIcon className="text-indigo-600" fontSize="large" />
                    </div>
                    <Typography
                        variant="h2"
                        component="h1"
                        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 sm:text-5xl"
                        gutterBottom
                    >
                        My Published Assignments
                    </Typography>
                    <Typography variant="subtitle1" className="text-slate-600 max-w-2xl mx-auto">
                        Manage and review all the assignments you've shared with your students
                    </Typography>
                </div>

                {/* Filter (unchanged) */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <FilterListIcon className="text-slate-500" />
                        <Typography variant="body1" className="text-slate-700 font-medium">
                            Filter by year:
                        </Typography>
                    </div>
                    <div className="relative max-w-xs w-full">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 pr-8 shadow-sm hover:border-indigo-400 transition-colors"
                        >
                            {yearOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year === "ALL" ? "All Years" : `Year ${year}`}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Loading / Error / Empty states (unchanged) */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <CircularProgress size={60} thickness={4} className="text-indigo-600" />
                    </div>
                )}

                {error && !loading && (
                    <Paper className="p-8 text-center bg-red-50 border border-red-200 rounded-2xl">
                        <Typography variant="h6" className="text-red-700 mb-2">
                            Oops! Something went wrong.
                        </Typography>
                        <Typography className="text-red-600">{error}</Typography>
                    </Paper>
                )}

                {!loading && !error && filteredAssignments.length === 0 && (
                    <Paper className="p-12 text-center bg-white/70 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300">
                        <AssignmentIcon className="text-slate-400 mb-4" style={{ fontSize: 60 }} />
                        <Typography variant="h6" className="text-slate-700 font-semibold mb-2">
                            No assignments here
                        </Typography>
                        <Typography className="text-slate-500">
                            {selectedYear === "ALL"
                                ? "You haven't published any assignments yet."
                                : `No assignments for Year ${selectedYear}.`}
                        </Typography>
                    </Paper>
                )}

                {/* Assignment Cards with shiny buttons and description */}
                {!loading && !error && filteredAssignments.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredAssignments.map((a, index) => (
                            <Fade in timeout={300} style={{ transitionDelay: `${index * 50}ms` }} key={a.assignmentId}>
                                <Card
                                    elevation={0}
                                    className="group relative bg-white rounded-2xl border border-slate-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <CardContent className="p-6 flex-grow">
                                        {/* Title and Year Chip */}
                                        <div className="flex items-start justify-between mb-3">
                                            <Typography
                                                variant="h6"
                                                className="font-bold text-slate-800 line-clamp-1 pr-4"
                                            >
                                                {a.title}
                                            </Typography>
                                            <Chip
                                                label={`Year ${a.year}`}
                                                size="small"
                                                className="bg-indigo-50 text-indigo-700 font-medium"
                                            />
                                        </div>

                                        {/* Subject with icon */}
                                        <div className="flex items-center gap-1 mb-3">
                                            <SubjectIcon fontSize="small" className="text-slate-400" />
                                            <Typography variant="body2" className="text-indigo-600 font-medium">
                                                {a.subject}
                                            </Typography>
                                        </div>

                                        {/* Description (if exists) */}
                                        {a.description && (
                                            <div className="flex items-start gap-1 mb-2">
                                                <DescriptionIcon fontSize="small" className="text-slate-400 mt-0.5" />
                                                <Typography variant="body2" className="text-slate-600 line-clamp-2">
                                                    {a.description}
                                                </Typography>
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardActions className="p-6 pt-0 flex justify-between gap-3">
                                        {/* Shiny PDF Button */}
                                        {a.pdfUrl ? (
                                            <Button
                                                href={a.pdfUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                startIcon={<PictureAsPdfIcon />}
                                                variant="contained"
                                                className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                                                sx={{ textTransform: 'none' }}
                                            >
                                                View PDF
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                startIcon={<PictureAsPdfIcon />}
                                                variant="outlined"
                                                className="flex-1 border-slate-300 text-slate-400"
                                                sx={{ textTransform: 'none' }}
                                            >
                                                No PDF
                                            </Button>
                                        )}

                                        {/* Shiny Delete Button */}
                                        <Button
                                            onClick={() => openDeleteModal(a.assignmentId)}
                                            startIcon={<DeleteOutlineIcon />}
                                            variant="contained"
                                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Fade>
                        ))}
                    </div>
                )}

                {/* Delete Modal (unchanged) */}
                <Modal
                    open={open}
                    onClose={closeModal}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 300,
                            sx: { backgroundColor: 'rgba(0,0,0,0.5)' }
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: { xs: '90%', sm: 400 },
                                bgcolor: "background.paper",
                                borderRadius: 4,
                                boxShadow: 24,
                                p: 4,
                                outline: 'none',
                            }}
                        >
                            <Typography variant="h5" component="h2" fontWeight="bold" className="text-slate-900 mb-2">
                                Confirm Deletion
                            </Typography>
                            <Typography variant="body1" className="text-slate-600 mb-6">
                                Are you sure you want to delete this assignment? This action cannot be undone.
                            </Typography>
                            <div className="flex justify-end gap-3">
                                <Button onClick={closeModal} variant="outlined" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                                    Cancel
                                </Button>
                                <Button onClick={confirmDelete} variant="contained" color="error" className="bg-red-600 hover:bg-red-700 shadow-md">
                                    Delete
                                </Button>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}