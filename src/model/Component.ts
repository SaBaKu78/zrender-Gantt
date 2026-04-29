import GlobalModel from '../model/Global'
import {
  BoxLayoutOptionMixin,
  ComponentFullType,
  ComponentMainType,
  ComponentOption,
  ComponentSubType,
} from '../util/types'
import Model from './Model'
import {
  ClassManager,
  enableClassManagement,
  ExtendableConstructor,
  isExtendedClass,
  parseClassType,
} from '../util/clazz'
import * as zrUtil from 'zrender/src/core/util'
import * as componentUtil from '../util/component'
import {
  makeInner,
  ModelFinderIdQuery,
  ModelFinderIndexQuery,
  queryReferringComponents,
  QueryReferringOpt,
} from '../util/model'
import * as layout from '../util/layout';


const inner = makeInner<
  {
    defaultOption: ComponentOption
  },
  ComponentModel
>()

class ComponentModel<
  Opt extends ComponentOption = ComponentOption
> extends Model<Opt> {
  /**
   * @readonly
   */
  type: ComponentFullType

  /**
   * @readonly
   */
  id: string

  name: string

  /**
   * @readOnly
   */
  mainType: ComponentMainType

  /**
   * @readOnly
   */
  subType: ComponentSubType

  /**
   * @readOnly
   */
  componentIndex: number

  /**
   * @readOnly
   */
  protected defaultOption: ComponentOption

  /**
   * @readOnly
   */
  piModel: GlobalModel

  /**
   * @readOnly
   */
  static dependencies: string[]

  readonly uid: string

  __viewId: string //视图id
  __requireNewView: boolean

  constructor(option: Opt, parentModel: Model, piModel: GlobalModel) {
    super(option, parentModel, piModel)
    this.uid = componentUtil.getUID('pi_cpt_model')
  }

  init(option: Opt, parentModel: Model, piModel: GlobalModel): void {
    this.mergeDefaultAndTheme(option, piModel)
  }

  mergeDefaultAndTheme(option: Opt, piModel: GlobalModel): void {
    zrUtil.merge(option, this.getDefaultOption())
  }

  mergeOption(option: Opt, piModel: GlobalModel): void {
    zrUtil.merge(this.option, option, true)

    const layoutMode = layout.fetchLayoutMode(this);
    if (layoutMode) {
        layout.mergeLayoutParam(
            this.option as BoxLayoutOptionMixin,
            option as BoxLayoutOptionMixin,
            layoutMode
        );
    }
  }

  optionUpdated(newCptOption: Opt, isInit: boolean): void {}

  getDefaultOption(): Opt {
    const ctor = this.constructor

    // If using class declaration, it is different to travel super class
    // in legacy env and auto merge defaultOption. So if using class
    // declaration, defaultOption should be merged manually.
    if (!isExtendedClass(ctor)) {
      // When using ts class, defaultOption must be declared as static.
      return (ctor as any).defaultOption
    }

    // FIXME: remove this approach?
    const fields = inner(this)
    if (!fields.defaultOption) {
      const optList = []
      let clz = ctor as ExtendableConstructor
      while (clz) {
        const opt = clz.prototype.defaultOption
        opt && optList.push(opt)
        clz = clz.superClass
      }

      let defaultOption = {}
      for (let i = optList.length - 1; i >= 0; i--) {
        defaultOption = zrUtil.merge(defaultOption, optList[i], true)
      }
      fields.defaultOption = defaultOption
    }
    return fields.defaultOption as Opt
  }

  getReferringComponents(
    mainType: ComponentMainType,
    opt: QueryReferringOpt
  ): {
    // Always be array rather than null/undefined, which is convenient to use.
    models: ComponentModel[]
    // Whether target component is specified
    specified: boolean
  } {
    const indexKey = (mainType + 'Index') as keyof Opt
    const idKey = (mainType + 'Id') as keyof Opt

    return queryReferringComponents(
      this.piModel,
      mainType,
      {
        index: this.get(indexKey, true) as unknown as ModelFinderIndexQuery,
        id: this.get(idKey, true) as unknown as ModelFinderIdQuery,
      },
      opt
    )
  }

  getBoxLayoutParams() {
    // Consider itself having box layout configs.
    const boxLayoutModel = this as Model<ComponentOption & BoxLayoutOptionMixin>
    return {
      left: boxLayoutModel.get('left'),
      top: boxLayoutModel.get('top'),
      right: boxLayoutModel.get('right'),
      bottom: boxLayoutModel.get('bottom'),
      width: boxLayoutModel.get('width'),
      height: boxLayoutModel.get('height'),
    }
  }

  static registerClass: ClassManager['registerClass']
  static hasClass: ClassManager['hasClass']
  static getClass: ClassManager['getClass']
  static registerSubTypeDefaulter: componentUtil.SubTypeDefaulterManager['registerSubTypeDefaulter']
}

export type ComponentModelConstructor = typeof ComponentModel &
  ClassManager &
  componentUtil.SubTypeDefaulterManager &
  ExtendableConstructor &
  componentUtil.TopologicalTravelable<object>

enableClassManagement(ComponentModel as ComponentModelConstructor)
componentUtil.enableSubTypeDefaulter(
  ComponentModel as ComponentModelConstructor
)
componentUtil.enableTopologicalTravel(
  ComponentModel as ComponentModelConstructor,
  getDependencies
)

function getDependencies(componentType: string): string[] {
  let deps: string[] = []

  zrUtil.each(
    (ComponentModel as ComponentModelConstructor).getClassesByMainType(
      componentType
    ),
    function (clz) {
      deps = deps.concat(
        (clz as any).dependencies || (clz as any).prototype.dependencies || []
      )
    }
  )

  // Ensure main type.
  deps = zrUtil.map(deps, function (type) {
    return parseClassType(type).main
  })

  // Hack dataset for convenience.
  if (componentType !== 'dataset' && zrUtil.indexOf(deps, 'dataset') <= 0) {
    deps.unshift('dataset')
  }

  return deps
}

export default ComponentModel
