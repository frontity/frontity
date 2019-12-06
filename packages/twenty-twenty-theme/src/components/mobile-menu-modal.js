import React, { useRef } from "react";
import { styled, connect, Global } from "frontity";
import Link from "./link";
import { CloseNavToggle } from "./nav-toggle";
import { CloseIcon } from "./icons";
import useFocusTrap from "./use-trap-focus";
import useFocusEffect from "./use-focus-effect";

const MobileMenuModal = ({ state, actions }) => {
  const { menu, isMobileMenuOpen } = state.theme;
  const { closeMobileMenu } = actions.theme;
  const isThereLinks = menu != null && menu.length > 0;

  // Keep a reference to the close button so we can focus on it when
  // the modal opens
  const closeButtonRef = useRef();
  const menuRef = useRef();

  useFocusEffect(closeButtonRef, isMobileMenuOpen);
  useFocusTrap(menuRef, isMobileMenuOpen);

  return (
    <Modal data-open={isMobileMenuOpen}>
      {isMobileMenuOpen && (
        <Global styles={{ body: { overflowY: "hidden" } }} />
      )}
      <ModalInner>
        <MenuWrapper ref={menuRef}>
          <div style={{ flexShrink: 0 }}>
            <CloseNavToggle
              ref={closeButtonRef}
              aria-expanded={isMobileMenuOpen}
              onClick={closeMobileMenu}
            >
              <ToggleText> Close Menu</ToggleText>
              <CloseIcon />
            </CloseNavToggle>

            <MenuContent
              as="nav"
              role="navigation"
              aria-label="Mobile menu links"
            >
              <MenuList className="reset-list-style">
                {isThereLinks &&
                  menu.map(([name, link]) => (
                    <MenuListItem key={name}>
                      <MenuLinkWrapper>
                        <MenuLink
                          link={link}
                          aria-current={
                            state.router.link === link ? "page" : undefined
                          }
                        >
                          {name}
                        </MenuLink>
                      </MenuLinkWrapper>
                    </MenuListItem>
                  ))}
              </MenuList>
            </MenuContent>
          </div>
        </MenuWrapper>
      </ModalInner>
    </Modal>
  );
};

const Modal = styled.div`
  background: #fff;
  display: none;
  opacity: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  bottom: 0;
  right: 99999rem;
  top: 0;
  z-index: 99;

  &[data-open="true"] {
    display: flex;
    left: 0;
    opacity: 1;
    right: 0;
    transition: opacity 0.25s ease-out;
  }
`;

const ModalInner = styled.div`
  background: #fff;
  display: flex;
  justify-content: stretch;
  overflow: auto;
  width: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 120rem;
  width: calc(100% - 4rem);
`;

const MenuContent = styled.nav`
  display: block;
`;

const MenuList = styled.ul`
  position: relative;
  left: calc(50% - 50vw);
  width: 100vw;
`;

const ToggleText = styled.span`
  margin-right: 1.6rem;
  * {
    fill: currentColor;
  }
`;

const MenuListItem = styled.li`
  position: relative;
  border-style: solid;
  border-width: 0.1rem 0 0 0;
  border-color: #dcd7ca;
  display: flex;
  flex-wrap: wrap;
  line-height: 1;
  justify-content: flex-start;
  margin: 0;
`;

const MenuLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MenuLink = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.0375em;
  display: block;
  padding: 2rem 2.5rem;
  text-decoration: none;
  width: 100%;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
  /* styles for active link */
  &[aria-current="page"] {
    text-decoration: underline;
  }
`;

export default connect(MobileMenuModal);
