  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(false);

const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    // Check if there are no results
    const filtered = rows.filter(
      (row) =>
        row.itemName.toLowerCase().includes(query) ||
        row.code.toLowerCase().includes(query)
    );
  
    if (filtered.length === 0 && query.trim() !== '') {
      setSearchError(true);
    } else {
      setSearchError(false);
    }
  };

const highlightText = (text, query) => {
    if (!query) {
      return text;
    }
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

/* for this, u have to add the highlightText part for it to show up */
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'itemName',
      headerName: 'Item Name',
      width: 130,
      renderCell: (params) => (
        <div>
          {highlightText(params.value, searchQuery)} {/* this */}
        </div>
      ),
    },

{/* Search bar */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            marginRight: '1rem',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey',
              },
              '&:hover fieldset': {
                borderColor: 'green',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'green',
              },
            },
          }}
        />

    {searchError && (
          <Alert severity="error" onClose={() => setSearchError(false)} sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '50%' }}>
            <AlertTitle>Error</AlertTitle>
            No results found for "{searchQuery}"
          </Alert>
        )}
