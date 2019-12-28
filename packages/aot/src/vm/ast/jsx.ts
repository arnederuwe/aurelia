import {
  JsxAttribute,
  JsxAttributes,
  JsxChild,
  JsxClosingElement,
  JsxClosingFragment,
  JsxElement,
  JsxExpression,
  JsxFragment,
  JsxOpeningElement,
  JsxOpeningFragment,
  JsxSelfClosingElement,
  JsxSpreadAttribute,
  JsxTagNameExpression,
  JsxText,
  Node,
  SyntaxKind,
  JsxAttributeLike,
} from 'typescript';
import {
  PLATFORM,
  ILogger,
} from '@aurelia/kernel';
import {
  Realm,
  ExecutionContext,
} from '../realm';
import {
  $Any,
  $AnyNonEmpty,
} from '../types/_shared';
import {
  I$Node,
  Context,
  $identifier,
  $$AssignmentExpressionOrHigher,
  $assignmentExpression,
  $AssignmentExpressionNode,
  $$JsxOpeningLikeElement,
  $i,
  TransformationContext,
} from './_shared';
import {
  $$ESModuleOrScript,
} from './modules';
import {
  $Identifier,
  $PropertyAccessExpression,
  $ThisExpression,
} from './expressions';
import {
  $StringLiteral,
} from './literals';

const {
  emptyArray,
} = PLATFORM;

export type $$JsxParent = (
  $JsxElement |
  $JsxFragment
);

export type $$JsxChild = (
  $JsxText |
  $JsxExpression |
  $JsxElement |
  $JsxSelfClosingElement |
  $JsxFragment
);

export function $$jsxChildList(
  nodes: readonly JsxChild[],
  ctx: Context,
  depth: number,
  mos: $$ESModuleOrScript,
  realm: Realm,
  logger: ILogger,
  path: string,
): readonly $$JsxChild[] {
  if (nodes === void 0 || nodes.length === 0) {
    return emptyArray;
  }

  const len = nodes.length;
  const $nodes: $$JsxChild[] = Array(len);
  for (let i = 0; i < len; ++i) {
    switch (nodes[i].kind) {
      case SyntaxKind.JsxText:
        $nodes[i] = $JsxText.create(nodes[i] as JsxText, ctx, i, depth + 1, mos, realm, logger, path);
        break;
      case SyntaxKind.JsxExpression:
        $nodes[i] = $JsxExpression.create(nodes[i] as JsxExpression, ctx, i, depth + 1, mos, realm, logger, path);
        break;
      case SyntaxKind.JsxElement:
        $nodes[i] = $JsxElement.create(nodes[i] as JsxElement, ctx, i, depth + 1, mos, realm, logger, path);
        break;
      case SyntaxKind.JsxSelfClosingElement:
        $nodes[i] = $JsxSelfClosingElement.create(nodes[i] as JsxSelfClosingElement, ctx, i, depth + 1, mos, realm, logger, path);
        break;
      case SyntaxKind.JsxFragment:
        $nodes[i] = $JsxFragment.create(nodes[i] as JsxFragment, ctx, i, depth + 1, mos, realm, logger, path);
        break;
    }
  }
  return $nodes;
}

export class $JsxElement implements I$Node {
  public get $kind(): SyntaxKind.JsxElement { return SyntaxKind.JsxElement; }

  public $openingElement!: $JsxOpeningElement;
  public $children!: readonly $$JsxChild[];
  public $closingElement!: $JsxClosingElement;

  public parent!: $$JsxParent;
  public readonly path: string;

  private constructor(
    public readonly node: JsxElement,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxElement`;
  }

  public static create(
    node: JsxElement,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxElement {
    const $node = new $JsxElement(node, ctx, idx, depth, mos, realm, logger, path);

    const $openingElement = $node.$openingElement = $JsxOpeningElement.create(node.openingElement, ctx, depth + 1, mos, realm, logger, path);
    $openingElement.parent = $node;
    const $children = $node.$children = $$jsxChildList(node.children, ctx, depth + 1, mos, realm, logger, path);
    $children.forEach(x => x.parent = $node);
    const $closingElement = $node.$closingElement = $JsxClosingElement.create(node.closingElement, ctx, depth + 1, mos, realm, logger, path);
    $closingElement.parent = $node;

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $AnyNonEmpty  {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.undefined; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export type $$JsxNamed = (
  $JsxOpeningElement |
  $JsxClosingElement |
  $JsxSelfClosingElement
);

export type $$JsxTagNamePropertyAccess = $PropertyAccessExpression & {
  expression: $$JsxTagNameExpression;
};

export type $$JsxTagNameExpression = (
  $Identifier |
  $ThisExpression |
  $$JsxTagNamePropertyAccess
);

export function $$jsxTagNameExpression(
  node: JsxTagNameExpression,
  ctx: Context,
  idx: number,
  depth: number,
  mos: $$ESModuleOrScript,
  realm: Realm,
  logger: ILogger,
  path: string,
): $$JsxTagNameExpression {
  switch (node.kind) {
    case SyntaxKind.Identifier:
      return $Identifier.create(node, ctx, idx, depth + 1, mos, realm, logger, path);
    case SyntaxKind.ThisKeyword:
      return $ThisExpression.create(node, ctx, idx, depth + 1, mos, realm, logger, path);
    case SyntaxKind.PropertyAccessExpression:
      return $PropertyAccessExpression.create(node, ctx, idx, depth + 1, mos, realm, logger, path) as $$JsxTagNamePropertyAccess;
    default:
      throw new Error(`Unexpected syntax node: ${SyntaxKind[(node as Node).kind]}.`);
  }
}

export class $JsxSelfClosingElement implements I$Node {
  public get $kind(): SyntaxKind.JsxSelfClosingElement { return SyntaxKind.JsxSelfClosingElement; }

  public $tagName!: $$JsxTagNameExpression;
  public $attributes!: $JsxAttributes;

  public parent!: $$JsxParent;
  public readonly path: string;

  private constructor(
    public readonly node: JsxSelfClosingElement,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxSelfClosingElement`;
  }

  public static create(
    node: JsxSelfClosingElement,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxSelfClosingElement {
    const $node = new $JsxSelfClosingElement(node, ctx, idx, depth, mos, realm, logger, path);

    const $tagName = $node.$tagName = $$jsxTagNameExpression(node.tagName, ctx, -1, depth + 1, mos, realm, logger, path);
    $tagName.parent = $node;
    const $attributes = $node.$attributes = $JsxAttributes.create(node.attributes, ctx, depth + 1, mos, realm, logger, path);
    $attributes.parent = $node;

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $AnyNonEmpty  {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.undefined; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxFragment implements I$Node {
  public get $kind(): SyntaxKind.JsxFragment { return SyntaxKind.JsxFragment; }

  public $openingFragment!: $JsxOpeningFragment;
  public $children!: readonly $$JsxChild[];
  public $closingFragment!: $JsxClosingFragment;

  public parent!: $$JsxParent;
  public readonly path: string;

  private constructor(
    public readonly node: JsxFragment,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxFragment`;
  }

  public static create(
    node: JsxFragment,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxFragment {
    const $node = new $JsxFragment(node, ctx, idx, depth, mos, realm, logger, path);

    const $openingFragment = $node.$openingFragment = $JsxOpeningFragment.create(node.openingFragment, ctx, depth + 1, mos, realm, logger, path);
    $openingFragment.parent = $node;
    const $children = $node.$children = $$jsxChildList(node.children, ctx, depth + 1, mos, realm, logger, path);
    $children.forEach(x => x.parent = $node);
    const $closingFragment = $node.$closingFragment = $JsxClosingFragment.create(node.closingFragment, ctx, depth + 1, mos, realm, logger, path);
    $closingFragment.parent = $node;

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $AnyNonEmpty  {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.undefined; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxText implements I$Node {
  public get $kind(): SyntaxKind.JsxText { return SyntaxKind.JsxText; }

  public parent!: $$JsxParent;
  public readonly path: string;

  private constructor(
    public readonly node: JsxText,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxText`;
  }

  public static create(
    node: JsxText,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxText {
    const $node = new $JsxText(node, ctx, idx, depth, mos, realm, logger, path);
    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxOpeningElement implements I$Node {
  public get $kind(): SyntaxKind.JsxOpeningElement { return SyntaxKind.JsxOpeningElement; }

  public $tagName!: $$JsxTagNameExpression;
  public $attributes!: $JsxAttributes;

  public parent!: $JsxElement;
  public readonly path: string;

  private constructor(
    public readonly node: JsxOpeningElement,
    public readonly ctx: Context,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}.JsxOpeningElement`;
  }

  public static create(
    node: JsxOpeningElement,
    ctx: Context,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxOpeningElement {
    const $node = new $JsxOpeningElement(node, ctx, depth, mos, realm, logger, path);

    const $tagName = $node.$tagName = $$jsxTagNameExpression(node.tagName, ctx, -1, depth + 1, mos, realm, logger, path);
    $tagName.parent = $node;
    const $attributes = $node.$attributes = $JsxAttributes.create(node.attributes, ctx, depth + 1, mos, realm, logger, path);
    $attributes.parent = $node;

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxClosingElement implements I$Node {
  public get $kind(): SyntaxKind.JsxClosingElement { return SyntaxKind.JsxClosingElement; }

  public $tagName!: $$JsxTagNameExpression;

  public parent!: $JsxElement;
  public readonly path: string;

  private constructor(
    public readonly node: JsxClosingElement,
    public readonly ctx: Context,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}.JsxClosingElement`;
  }

  public static create(
    node: JsxClosingElement,
    ctx: Context,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxClosingElement {
    const $node = new $JsxClosingElement(node, ctx, depth, mos, realm, logger, path);

    const $tagName = $node.$tagName = $$jsxTagNameExpression(node.tagName, ctx, -1, depth + 1, mos, realm, logger, path);
    $tagName.parent = $node;

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxOpeningFragment implements I$Node {
  public get $kind(): SyntaxKind.JsxOpeningFragment { return SyntaxKind.JsxOpeningFragment; }

  public parent!: $JsxFragment;
  public readonly path: string;

  private constructor(
    public readonly node: JsxOpeningFragment,
    public readonly ctx: Context,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}.JsxOpeningFragment`;
  }

  public static create(
    node: JsxOpeningFragment,
    ctx: Context,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxOpeningFragment {
    const $node = new $JsxOpeningFragment(node, ctx, depth, mos, realm, logger, path);
    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxClosingFragment implements I$Node {
  public get $kind(): SyntaxKind.JsxClosingFragment { return SyntaxKind.JsxClosingFragment; }

  public parent!: $JsxFragment;
  public readonly path: string;

  private constructor(
    public readonly node: JsxClosingFragment,
    public readonly ctx: Context,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}.JsxClosingFragment`;
  }

  public static create(
    node: JsxClosingFragment,
    ctx: Context,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxClosingFragment {
    const $node = new $JsxClosingFragment(node, ctx, depth, mos, realm, logger, path);
    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxAttribute implements I$Node {
  public get $kind(): SyntaxKind.JsxAttribute { return SyntaxKind.JsxAttribute; }

  public $name!: $Identifier;
  public $initializer!: $StringLiteral | $JsxExpression | undefined;

  public parent!: $JsxAttributes;
  public readonly path: string;

  private constructor(
    public readonly node: JsxAttribute,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxAttribute`;
  }

  public static create(
    node: JsxAttribute,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxAttribute {
    const $node = new $JsxAttribute(node, ctx, idx, depth, mos, realm, logger, path);

    const $name = $node.$name = $identifier(node.name, ctx, -1, depth + 1, mos, realm, logger, path);
    $name.parent = $node;
    if (node.initializer === void 0) {
      $node.$initializer = void 0;
    } else {
      if (node.initializer.kind === SyntaxKind.StringLiteral) {
        const $initializer = $node.$initializer = $StringLiteral.create(node.initializer, ctx, -1, depth + 1, mos, realm, logger, path);
        $initializer.parent = $node;
      } else {
        const $initializer = $node.$initializer = $JsxExpression.create(node.initializer, ctx, -1, depth + 1, mos, realm, logger, path);
        $initializer.parent = $node;
      }
    }

    return $node;
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export type $$JsxAttributeLike = (
  $JsxAttribute |
  $JsxSpreadAttribute
);

export function $$jsxAttributeLikeList(
  nodes: readonly JsxAttributeLike[],
  ctx: Context,
  depth: number,
  mos: $$ESModuleOrScript,
  realm: Realm,
  logger: ILogger,
  path: string,
): readonly $$JsxAttributeLike[] {
  if (nodes === void 0 || nodes.length === 0) {
    return emptyArray;
  }

  const len = nodes.length;
  const $nodes: $$JsxAttributeLike[] = Array(len);
  for (let i = 0; i < len; ++i) {
    switch (nodes[i].kind) {
      case SyntaxKind.JsxAttribute:
        $nodes[i] = $JsxAttribute.create(nodes[i] as JsxAttribute, ctx, i, depth + 1, mos, realm, logger, path);
        break;
      case SyntaxKind.JsxSpreadAttribute:
        $nodes[i] = $JsxSpreadAttribute.create(nodes[i] as JsxSpreadAttribute, ctx, i, depth + 1, mos, realm, logger, path);
        break;
    }
  }
  return $nodes;
}

export class $JsxAttributes implements I$Node {
  public get $kind(): SyntaxKind.JsxAttributes { return SyntaxKind.JsxAttributes; }

  public $properties!: readonly $$JsxAttributeLike[];

  public parent!: $$JsxOpeningLikeElement;
  public readonly path: string;

  private constructor(
    public readonly node: JsxAttributes,
    public readonly ctx: Context,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}.JsxAttributes`;
  }

  public static create(
    node: JsxAttributes,
    ctx: Context,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxAttributes {
    const $node = new $JsxAttributes(node, ctx, depth, mos, realm, logger, path);

    const $properties = $node.$properties = $$jsxAttributeLikeList(node.properties, ctx, depth + 1, mos, realm, logger, path);
    $properties.forEach(x => x.parent = $node);

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxSpreadAttribute implements I$Node {
  public get $kind(): SyntaxKind.JsxSpreadAttribute { return SyntaxKind.JsxSpreadAttribute; }

  public $expression!: $$AssignmentExpressionOrHigher;

  public parent!: $JsxAttributes;
  public readonly path: string;

  private constructor(
    public readonly node: JsxSpreadAttribute,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxSpreadAttribute`;
  }

  public static create(
    node: JsxSpreadAttribute,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxSpreadAttribute {
    const $node = new $JsxSpreadAttribute(node, ctx, idx, depth, mos, realm, logger, path);

    const $expression = $node.$expression = $assignmentExpression(node.expression as $AssignmentExpressionNode, ctx, -1, depth + 1, mos, realm, logger, path);
    $expression.parent = $node;

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}

export class $JsxExpression implements I$Node {
  public get $kind(): SyntaxKind.JsxExpression { return SyntaxKind.JsxExpression; }

  public $expression!: $$AssignmentExpressionOrHigher | undefined;

  public parent!: $$JsxParent | $$JsxAttributeLike;
  public readonly path: string;

  private constructor(
    public readonly node: JsxExpression,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly depth: number,
    public readonly mos: $$ESModuleOrScript,
    public readonly realm: Realm,
    public readonly logger: ILogger,
    path: string,
  ) {
    this.path = `${path}${$i(idx)}.JsxExpression`;
  }

  public static create(
    node: JsxExpression,
    ctx: Context,
    idx: number,
    depth: number,
    mos: $$ESModuleOrScript,
    realm: Realm,
    logger: ILogger,
    path: string,
  ): $JsxExpression {
    const $node = new $JsxExpression(node, ctx, idx, depth, mos, realm, logger, path);

    const $expression = $node.$expression = $assignmentExpression(node.expression as $AssignmentExpressionNode | undefined, ctx, -1, depth + 1, mos, realm, logger, path);
    if ($expression !== void 0) { $expression.parent = $node; }

    return $node;
  }

  public Evaluate(
    ctx: ExecutionContext,
  ): $Any {
    ctx.checkTimeout();

    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    this.logger.debug(`${this.path}.Evaluate(#${ctx.id})`);

    return intrinsics.empty; // TODO: implement this
  }

  public transform(tctx: TransformationContext): this['node'] {
    return this.node;
  }
}
