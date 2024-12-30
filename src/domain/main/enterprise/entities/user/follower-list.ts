import { WatchedList } from '@/core/entities/watched-list'
import { Follower } from './follower'

export class FollowerList extends WatchedList<Follower> {
  compareItems(a: Follower, b: Follower): boolean {
    return a.equals(b)
  }
}
