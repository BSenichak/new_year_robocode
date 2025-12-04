import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store'
import { clearValues } from '../../store/sudokuSlice'


export default function ClearModal({isOpen, closeModal}: any) {
    let dispatch = useDispatch<AppDispatch>();
  return (
    <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle>Ви впевнені, що хочете розпочати дешифровку файлу заново? Увесь Ваш поточний прогрес буде втрачено!</DialogTitle>
        <DialogActions>
            <Button variant='contained' color='success' onClick={() => {
                dispatch(clearValues())
                closeModal()
            }}>Розпочати заново</Button>
            <Button variant='contained' color='error' onClick={closeModal}>Повернутись назад</Button>
        </DialogActions>
    </Dialog>
  )
}
