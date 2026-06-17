import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Grid, MenuItem 
} from '@mui/material';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import { fetchPlayers } from '../../store/slices/dataSlice';

const validationSchema = Yup.object({
  Name: Yup.string().required('Name is required'),
  Position: Yup.string().required('Position is required'),
  OVR: Yup.number().min(1).max(99).required('OVR must be between 1 and 99'),
  Age: Yup.number().min(15).max(55).required('Age must be between 15 and 55'),
  Team: Yup.string().required('Team is required'),
  Nation: Yup.string().required('Nation is required'),
  ID: Yup.string().required('Unique ID is required'),
});

const PlayerModal = ({ open, onClose, player = null, page, limit }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(player);

  const formik = useFormik({
    initialValues: {
      ID: player?.ID || '',
      Name: player?.Name || '',
      Position: player?.Position || '',
      OVR: player?.OVR || '',
      Age: player?.Age || '',
      Team: player?.Team || '',
      Nation: player?.Nation || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditing) {
          const playerId = player.ID || player._id;
          await api.patch(`/players/${playerId}`, values);
          toast.success('Player updated successfully');
        } else {
          // For creation, we might need to send more default values depending on the schema
          await api.post('/players', {
             ...values,
             PAC: values.OVR, SHO: values.OVR, PAS: values.OVR, 
             DRI: values.OVR, DEF: values.OVR, PHY: values.OVR
          });
          toast.success('Player created successfully');
        }
        dispatch(fetchPlayers({ page, limit })); // Refresh list
        onClose();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Operation failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        className: 'bg-white dark:bg-gray-900'
      }}
    >
      <DialogTitle className="bg-gray-50 dark:bg-gray-800/50 dark:text-white border-b border-gray-100 dark:border-gray-800 font-bold">
        {isEditing ? 'Edit Player' : 'Add New Player'}
      </DialogTitle>
      
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="space-y-4 pt-6">
          <Grid container spacing={3}>
            {[
              { name: 'ID', label: 'Player ID (Unique)', disabled: isEditing, sm: 6 },
              { name: 'Name', label: 'Full Name', sm: 6 },
              { name: 'Position', label: 'Position (e.g. ST, CAM, CB)', sm: 6 },
              { name: 'OVR', label: 'Overall Rating (OVR)', type: 'number', sm: 6 },
              { name: 'Age', label: 'Age', type: 'number', sm: 4 },
              { name: 'Team', label: 'Team/Club', sm: 4 },
              { name: 'Nation', label: 'Nation', sm: 4 },
            ].map((field) => (
              <Grid item xs={12} sm={field.sm} key={field.name}>
                <TextField
                  fullWidth
                  type={field.type || 'text'}
                  name={field.name}
                  label={field.label}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                  disabled={field.disabled}
                  InputLabelProps={{
                    className: 'dark:text-gray-400'
                  }}
                  InputProps={{
                    className: 'dark:text-gray-100 dark:bg-gray-800/50 dark:border-gray-700'
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(156, 163, 175, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(156, 163, 175, 0.5)' },
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 p-4">
          <Button 
            onClick={onClose} 
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={formik.isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-6 py-2 rounded-lg font-medium tracking-wide"
          >
            {isEditing ? 'Save Changes' : 'Create Player'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PlayerModal;
