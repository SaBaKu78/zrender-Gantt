import { EventProcessor, EventQuery } from 'zrender/src/core/Eventful'
import Element from 'zrender/src/Element'
import { NormalizedEventQuery } from './types'

export class PIEventProcessor implements EventProcessor {
  eventInfo: {
    targetEl: Element
  }

  normalizeQuery(query: EventQuery): NormalizedEventQuery {
    return {
      cptQuery: null,
      dataQuery: null,
      otherQuery: null,
    }
  }

  filter(eventType: string, query: NormalizedEventQuery): boolean {
    return false
  }

  afterTrigger() {
    // Make sure the eventInfo won't be used in next trigger.
    this.eventInfo = null
  }
}
