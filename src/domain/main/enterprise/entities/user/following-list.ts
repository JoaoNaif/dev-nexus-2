import { WatchedList } from '@/core/entities/watched-list'
import { Following } from './following'

export class FollowingList extends WatchedList<Following> {
  compareItems(a: Following, b: Following): boolean {
    return a.equals(b)
  }
}
