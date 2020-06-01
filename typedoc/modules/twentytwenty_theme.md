[Frontity](../README.md) › [Globals](../globals.md) › [twentytwenty-theme](twentytwenty_theme.md)

# Package: twentytwenty-theme

## Index

### Variables

* [BaseToggle](twentytwenty_theme.md#const-basetoggle)
* [CloseNavToggle](twentytwenty_theme.md#const-closenavtoggle)
* [EntryContent](twentytwenty_theme.md#const-entrycontent)
* [EntryTitle](twentytwenty_theme.md#const-entrytitle)
* [NavToggle](twentytwenty_theme.md#const-navtoggle)
* [Post](twentytwenty_theme.md#const-post)
* [PostHeader](twentytwenty_theme.md#const-postheader)
* [PostInner](twentytwenty_theme.md#const-postinner)
* [PostMetaList](twentytwenty_theme.md#const-postmetalist)
* [PostMetaWrapper](twentytwenty_theme.md#const-postmetawrapper)
* [PostTitle](twentytwenty_theme.md#const-posttitle)
* [SearchToggle](twentytwenty_theme.md#const-searchtoggle)
* [SectionContainer](twentytwenty_theme.md#const-sectioncontainer)
* [ToggleInner](twentytwenty_theme.md#const-toggleinner)
* [ToggleText](twentytwenty_theme.md#const-toggletext)
* [ToggleWrapper](twentytwenty_theme.md#const-togglewrapper)

### Functions

* [CalendarIcon](twentytwenty_theme.md#const-calendaricon)
* [ChatIcon](twentytwenty_theme.md#const-chaticon)
* [CloseIcon](twentytwenty_theme.md#const-closeicon)
* [LabeledIcon](twentytwenty_theme.md#const-labeledicon)
* [SearchIcon](twentytwenty_theme.md#const-searchicon)
* [TagIcon](twentytwenty_theme.md#const-tagicon)
* [ToggleIcon](twentytwenty_theme.md#const-toggleicon)
* [UserIcon](twentytwenty_theme.md#const-usericon)

## Variables

### `Const` BaseToggle

• **BaseToggle**: *StyledComponent‹ClassAttributes‹HTMLButtonElement› & ButtonHTMLAttributes‹HTMLButtonElement›, object, object›* = styled.button`
  appearance: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  text-align: inherit;
  user-select: none;
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  font-size: inherit;
  font-weight: 400;
  letter-spacing: inherit;
  padding: 0;
  text-transform: none;
  align-items: center;
  display: flex;
  overflow: visible;
  padding: 0 2rem;
  color: #000000;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 1220px) {
    padding: 0 4rem;
  }

  @media (min-width: 1000px) {
    height: 4.4rem;
    padding: 0 3rem;
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    top: auto;
    width: auto;
    ${(props) =>
      props.isMobile &&
      css`
        display: none !important;
      `}
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L5)*

___

### `Const` CloseNavToggle

• **CloseNavToggle**: *StyledComponent‹object & object, object, object›* = styled(BaseToggle)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  color: #000000;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 3.1rem 0;

  @media (max-width: 700px) {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  svg {
    height: 1.6rem;
    width: 1.6rem;
    fill: currentColor;
  }

  > span {
    margin-right: 1.6rem;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:66](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L66)*

___

### `Const` EntryContent

• **EntryContent**: *StyledComponent‹ClassAttributes‹HTMLDivElement› & HTMLAttributes‹HTMLDivElement›, object, object›* = styled.div`
  line-height: 1.5;
  max-width: 58rem;
  font-family: "Hoefler Text", Garamond, "Times New Roman", serif;
  letter-spacing: normal;

  @media (min-width: 700px) {
    font-size: 2.1rem;
  }

  > *:first-of-type {
    margin-top: 0;
  }

  figure {
    margin: 2em 0;
    max-width: 100%;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-item.js:151](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-item.js#L151)*

___

### `Const` EntryTitle

• **EntryTitle**: *StyledComponent‹ClassAttributes‹HTMLHeadingElement› & HTMLAttributes‹HTMLHeadingElement›, object, object›* = styled.h1`
  margin: 0;

  @media (min-width: 700px) {
    font-size: 6.4rem !important;
  }

  @media (min-width: 1200px) {
    font-size: 8.4rem !important;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/page-error.js:39](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/page-error.js#L39)*

___

### `Const` NavToggle

• **NavToggle**: *StyledComponent‹object & object, object, object›* = styled(BaseToggle)`
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 6.6rem;

  @media (min-width: 700px) {
    right: 2rem;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:54](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L54)*

___

### `Const` Post

• **Post**: *StyledComponent‹ClassAttributes‹HTMLElement› & HTMLAttributes‹HTMLElement›, object, object›* = styled.article`
  &:first-of-type {
    padding: 4rem 0 0;
  }

  @media (min-width: 700px) {
    &:first-of-type {
      padding: 8rem 0 0;
    }
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-item.js:92](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-item.js#L92)*

___

### `Const` PostHeader

• **PostHeader**: *StyledComponent‹ClassAttributes‹HTMLElement› & HTMLAttributes‹HTMLElement›, object, object›* = styled.header`
  text-align: center;
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-item.js:104](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-item.js#L104)*

___

### `Const` PostInner

• **PostInner**: *StyledComponent‹object & object, object, object›* = styled(SectionContainer)`
  padding-top: 5rem;
  @media (min-width: 700px) {
    padding-top: 8rem;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-item.js:144](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-item.js#L144)*

___

### `Const` PostMetaList

• **PostMetaList**: *StyledComponent‹ClassAttributes‹HTMLUListElement› & HTMLAttributes‹HTMLUListElement›, object, object›* = styled.ul`
  justify-content: center;
  color: #6d6d6d;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  font-weight: 500;
  list-style: none;
  margin: -1rem 0 0 -2rem;

  svg {
    fill: currentColor;
  }

  @media (min-width: 700px) {
    font-size: 1.6rem;
    margin: -1.4rem 0 0 -3rem;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-meta.js:13](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-meta.js#L13)*

___

### `Const` PostMetaWrapper

• **PostMetaWrapper**: *StyledComponent‹ClassAttributes‹HTMLDivElement› & HTMLAttributes‹HTMLDivElement›, object, object›* = styled.div`
  margin-top: 2rem;
  @media (min-width: 700px) {
    margin-top: 3rem;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-meta.js:6](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-meta.js#L6)*

___

### `Const` PostTitle

• **PostTitle**: *StyledComponent‹ClassAttributes‹HTMLHeadingElement› & HTMLAttributes‹HTMLHeadingElement›, object, object›* = styled.h1`
  margin: 0;
  @media (min-width: 700px) {
    font-size: 6.4rem !important;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-item.js:128](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-item.js#L128)*

___

### `Const` SearchToggle

• **SearchToggle**: *StyledComponent‹object & object, object, object›* = styled(BaseToggle)`
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;

  @media (min-width: 700px) {
    left: 2rem;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:93](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L93)*

___

### `Const` SectionContainer

• **SectionContainer**: *StyledComponent‹ClassAttributes‹HTMLDivElement› & HTMLAttributes‹HTMLDivElement›, any, object›* = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 4rem);
  max-width: ${getMaxWidth};

  @media (min-width: 700px) {
    width: calc(100% - 8rem);
  }
`

*Defined in [packages/twentytwenty-theme/src/components/post/post-item.js:117](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/post/post-item.js#L117)*

___

### `Const` ToggleInner

• **ToggleInner**: *StyledComponent‹ClassAttributes‹HTMLSpanElement› & HTMLAttributes‹HTMLSpanElement›, object, object›* = styled.span`
  display: flex;
  justify-content: center;
  height: 2.3rem;
  position: relative;
  bottom: 0.5rem;

  @media (min-width: 1000px) {
    position: static;
  }

  svg {
    height: 2.5rem;
    max-width: 2.3rem;
    width: 2.3rem;
    display: block;
    position: relative;
    z-index: 1;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:112](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L112)*

___

### `Const` ToggleText

• **ToggleText**: *StyledComponent‹ClassAttributes‹HTMLSpanElement› & HTMLAttributes‹HTMLSpanElement›, object, object›* = styled.span`
  color: #6d6d6d;
  font-size: 1rem;
  font-weight: 600;
  position: absolute;
  top: calc(100% + 0.5rem);
  width: auto;
  white-space: nowrap;
  word-break: break-all;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }

  @media (min-width: 1000px) {
    left: 0;
    right: 0;
    text-align: center;
    top: calc(100% - 0.3rem);
    width: auto;
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:133](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L133)*

___

### `Const` ToggleWrapper

• **ToggleWrapper**: *StyledComponent‹ClassAttributes‹HTMLDivElement› & HTMLAttributes‹HTMLDivElement›, object, object›* = styled.div`
  @media (min-width: 1000px) {
    position: relative;
  }

  &:only-child::before {
    background-color: #dcd7ca;

    @media (min-width: 1000px) {
      background: #dedfdf;
      content: "";
      display: block;
      height: 2.7rem;
      position: absolute;
      left: 0;
      top: calc(50% - 1.35rem);
      width: 0.1rem;
    }

    @media (min-width: 1000px) {
      content: "";
    }
  }
`

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:157](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L157)*

## Functions

### `Const` CalendarIcon

▸ **CalendarIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:3](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L3)*

**Returns:** *Element‹›*

___

### `Const` ChatIcon

▸ **ChatIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:21](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L21)*

**Returns:** *Element‹›*

___

### `Const` CloseIcon

▸ **CloseIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:90](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L90)*

**Returns:** *Element‹›*

___

### `Const` LabeledIcon

▸ **LabeledIcon**(`__namedParameters`: object): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/navigation/nav-toggle.js:105](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/navigation/nav-toggle.js#L105)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`Icon` | any |
`label` | any |

**Returns:** *Element‹›*

___

### `Const` SearchIcon

▸ **SearchIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:72](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L72)*

**Returns:** *Element‹›*

___

### `Const` TagIcon

▸ **TagIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:54](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L54)*

**Returns:** *Element‹›*

___

### `Const` ToggleIcon

▸ **ToggleIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:109](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L109)*

**Returns:** *Element‹›*

___

### `Const` UserIcon

▸ **UserIcon**(): *Element‹›*

*Defined in [packages/twentytwenty-theme/src/components/icons.js:36](https://github.com/frontity/frontity/blob/8f93b4e4/packages/twentytwenty-theme/src/components/icons.js#L36)*

**Returns:** *Element‹›*
