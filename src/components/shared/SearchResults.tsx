import { Models } from 'appwrite';
import React from 'react'
import GridPostList from './GridPostList';
import Loader from './Loader';

type SearchResultsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
    isWaiting: boolean;
}

const SearchResults = ({isSearchFetching, searchedPosts, isWaiting}: SearchResultsProps) => {
    console.log(isWaiting, "isWaiting")
    if(isSearchFetching || isWaiting) return <Loader />
    console.log("searchedPosts", searchedPosts)
    if(searchedPosts && searchedPosts.documents.length > 0) {
        return (
        <GridPostList posts={searchedPosts.documents}/>
    
    )} 

    return (
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
  )
}

export default SearchResults