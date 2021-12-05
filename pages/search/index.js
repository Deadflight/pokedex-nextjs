import Layout from "@/components/Layout"
import { Grid, Container, SearchIcon, Typography } from "@/ui/index.js"
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState } from "react"
import { useInfiniteQuery } from "react-query"



const Search = () => {
  const [term, setTerm] = useState('')


  
  // // Use react-query to improve our http cache strategy and to make pagination easier
  // const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
  //   useInfiniteQuery(

  //   )


  const updateTerm = (event) => {
    setTerm(event.currentTarget.value)
  }



  return (
    <Layout>
      <Grid container> 
        <Grid item xs={12}>
          <Typography variant="h4" align="center" >Search Pokemon</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth   variant="outlined">
                <OutlinedInput
                  id="search-term-field"
                  value={term}
                  onChange={updateTerm}
                  placeholder="Search"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
          </FormControl>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Search
