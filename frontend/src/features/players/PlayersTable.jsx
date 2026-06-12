import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TablePagination, IconButton, Chip, TextField, InputAdornment, Button
} from '@mui/material';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { fetchPlayers, setPage, setLimit, deletePlayer } from '../../store/slices/dataSlice';
import PlayerModal from './PlayerModal';

const PlayersTable = () => {
  const dispatch = useDispatch();
  const { players, total, page, limit, loading } = useSelector((state) => state.data);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    // We add a debounce effect for search
    const timer = setTimeout(() => {
      dispatch(fetchPlayers({ page, limit, search: searchTerm }));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, page, limit, searchTerm]);

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1)); // MUI pages are 0-indexed, our API is 1-indexed
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setLimit(parseInt(event.target.value, 10)));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await dispatch(deletePlayer(id)).unwrap();
        toast.success('Player deleted successfully!');
      } catch (error) {
        toast.error(error || 'Failed to delete player');
      }
    }
  };

  const handleOpenModal = (player = null) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const getOvrColor = (ovr) => {
    if (ovr >= 90) return 'success';
    if (ovr >= 80) return 'primary';
    if (ovr >= 70) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Players Directory</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="h-4 w-4 text-gray-400" />
                </InputAdornment>
              ),
              className: "bg-white dark:bg-gray-800 dark:text-white"
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(0,0,0,0.1)" },
                "&.Mui-focused fieldset": { borderColor: "#6366f1" } // indigo-500
              }
            }}
          />
          <Button 
            variant="contained" 
            startIcon={<Plus className="w-4 h-4" />}
            onClick={() => handleOpenModal()}
            className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap shadow-sm"
          >
            Add Player
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} elevation={0} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800">
        <Table sx={{ minWidth: 650 }} aria-label="players table">
          <TableHead className="bg-gray-50 dark:bg-gray-700/50">
            <TableRow>
              <TableCell className="font-semibold text-gray-600 dark:text-gray-300">Name</TableCell>
              <TableCell className="font-semibold text-gray-600 dark:text-gray-300">Position</TableCell>
              <TableCell className="font-semibold text-gray-600 dark:text-gray-300">OVR</TableCell>
              <TableCell className="font-semibold text-gray-600 dark:text-gray-300">Team</TableCell>
              <TableCell className="font-semibold text-gray-600 dark:text-gray-300">Nation</TableCell>
              <TableCell align="right" className="font-semibold text-gray-600 dark:text-gray-300">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-10 text-gray-500">
                  Loading players...
                </TableCell>
              </TableRow>
            ) : players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-10 text-gray-500">
                  No players found.
                </TableCell>
              </TableRow>
            ) : (
              players.map((row) => (
                <TableRow
                  key={row._id || row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-3">
                      {row.card && (
                        <img src={row.card} alt={row.Name} className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                      )}
                      <span>{row.Name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">{row.Position}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.OVR} 
                      color={getOvrColor(row.OVR)} 
                      size="small" 
                      className="font-bold"
                    />
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">{row.Team}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">{row.Nation}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 mr-2"
                      onClick={() => handleOpenModal(row)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                      onClick={() => handleDelete(row.ID || row._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page - 1} // MUI uses 0-indexed pages
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        />
      </TableContainer>

      {modalOpen && (
        <PlayerModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          player={selectedPlayer}
          page={page}
          limit={limit}
        />
      )}
    </div>
  );
};

export default PlayersTable;
