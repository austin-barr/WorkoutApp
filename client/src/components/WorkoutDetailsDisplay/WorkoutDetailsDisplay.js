import details from './WorkoutDetailsDisplay.module.css'
import { toLocalDate } from '../../utils'

const WorkoutDetailsDisplay = (props) => {

  console.log('props')
  console.log(props.workout)

  return (
    <div>
      <h2>{props.workout.name}</h2>
      {props.mode === 'log' &&
      <>
        <p>{toLocalDate(props.workout.date)}</p>
        <p>{props.workout.startTime} - {props.workout.endTime}</p>
      </>
      }
      <p>Estimated Lifting Time: {props.workout.estimatedTime / 60} min</p>
      <p>Exercises:</p>
      <ul className={details.list}>
        {props.workout.exercises.map((ex) => (
          <li
            className={details.listItem}
          >
            {ex.name} ({ex.weight} lbs {ex.sets} x {ex.reps})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutDetailsDisplay;