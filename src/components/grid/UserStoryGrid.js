import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { makeStyles } from '@material-ui/core/styles';
import USER_STORY_SERVICE from '../../services/user_story_service';
import '@progress/kendo-theme-material/dist/all.css';
import { orderBy, filterBy } from '@progress/kendo-data-query';
import GridColumnMenuDefaultFilter from '../utils/GridColumnMenuDefaultFilter'

const useStyles = makeStyles((theme) => ({
    btnCustomize: {
        margin: theme.spacing(1)
    }
  }));

const UserStoryGrid = (props) => {

    const dataState = {
        skip: 0,
        take: 20
    };

    const [dataResult, setDataResult] = React.useState();
    const [dataStateValue, setDataState] = React.useState(dataState);
    const [userStories, setUserStories] = React.useState();
    const [masterSort, setMasterSort] = React.useState([])

    const dataStateChange = (event) => {
        const processDataResult = process(userStories, event.data);
        setDataResult(processDataResult.data);
        setDataState(event.data);
    }

    React.useEffect(() => {
        const setUserStoriesList = async () => { 
            let userStoriesList = await USER_STORY_SERVICE.Get_User_Stories();
            const processStoresResult = process(userStoriesList, dataStateValue);
            setUserStories(userStoriesList);
            setDataResult(processStoresResult.data); 
        }
        setUserStoriesList();
    }, [dataStateValue]);

    const handleMasterSort = e => {
        setMasterSort(e.sort)
    }
    const [filter, setFilter] = React.useState()
    const onFilterChange = (e) => {
        setFilter(e.filter)
    }


    return (
        <div>
            <Grid
                sortable
                resizable
                reorderable
                pageable={{ buttonCount: 4, pageSizes: true }}
                
                data={filterBy(orderBy(dataResult, masterSort), filter)}
                {...dataStateValue}

                sort={masterSort}
                onSortChange={handleMasterSort}
                onDataStateChange = {dataStateChange}
                filter={filter}
                onFilterChange={onFilterChange}
            >
                <GridColumn field="id" title="Id" width="100px"/>
                <GridColumn field="summary" title="Summary" min-width="300px"/>
                <GridColumn field="description" title="Description" min-width="500px" />
                <GridColumn field="type" title="Type" columnMenu={GridColumnMenuDefaultFilter}/>
                <GridColumn field="complexity" title="Complexity"/>
                <GridColumn field="estimatedHrs" title="Estimatation" />
                <GridColumn field="cost" title="Cost" />
            </Grid>
        </div>
    )
}

export default UserStoryGrid;