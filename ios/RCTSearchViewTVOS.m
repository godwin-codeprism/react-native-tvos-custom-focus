//
//  RCTSearchViewTVOS.m
//  FocusPOC
//
//  Created by Godwin Vinny Carole Kati on 09/12/22.
//

#import "RCTSearchViewTVOS.h"
#import "React/RCTComponent.h"
#import "React/UIView+React.h"
#import "SearchResultsViewTVOSController.h"


@implementation RCTSearchViewTVOS{
  UIViewController *uiViewController;
  UISearchController *uiSearchController;
  UISearchContainerViewController *uiSearchContainerController;

}


- (void)layoutSubviews
{
    if(uiSearchContainerController == nil) {
        [self embedSearchController];
    }
}

- (void)didMoveToSuperview
{
    if(self.superview == nil) {
        [self removeSearchController];
    }
}

- (void)embedSearchController
{
  
  UIViewController *parentVC = self.reactViewController;
    
    if(parentVC == nil) {
        return;
    }
  uiViewController = [[UIViewController alloc] init];
  uiSearchController = [[UISearchController alloc] init ];
  uiSearchController.view.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
  uiSearchContainerController = [[UISearchContainerViewController alloc] initWithSearchController:uiSearchController];
  uiSearchController.view.backgroundColor = self.backgroundColor;
  uiSearchController.searchBar.searchBarStyle = UISearchBarStyleProminent;
  [uiSearchController setObscuresBackgroundDuringPresentation:true];
  uiSearchController.hidesNavigationBarDuringPresentation = false;
  uiSearchController.obscuresBackgroundDuringPresentation = false;


    
    [parentVC addChildViewController:uiSearchContainerController];
    [self addSubview:uiSearchContainerController.view];
    [uiSearchContainerController didMoveToParentViewController:parentVC];
    UIView *rootView = parentVC.view.window.rootViewController.view;
    for (UIGestureRecognizer *recognizer in rootView.gestureRecognizers) {
      if ([recognizer.allowedPressTypes containsObject:@(UIPressTypeSelect)] && [recognizer isKindOfClass:[UITapGestureRecognizer class]]) {
        [recognizer.view removeGestureRecognizer:recognizer];
      }
    }
}

-(void)removeSearchController
{
    if(uiSearchController == nil || uiSearchContainerController == nil) {
        return;
    }
    
    [uiSearchContainerController willMoveToParentViewController:nil];
    [uiSearchContainerController.view removeFromSuperview];
    [uiSearchContainerController removeFromParentViewController];
    uiSearchContainerController = nil;
    
    [uiSearchController willMoveToParentViewController:nil];
    [uiSearchController.view removeFromSuperview];
    [uiSearchController removeFromParentViewController];
    uiSearchController = nil;
}

- (void)updateSearchResultsForSearchController:(nonnull UISearchController *)searchController
{
  if (self.onChangeText) {
    self.onChangeText(@{@"text": searchController.searchBar.text});
  }
}

//- (void)reactBridgeDidFinishTransaction{
//  if(self.containerVC){
//    return;
//  }
//
//  UIViewController *reactController = self.reactSubviews.firstObject.reactViewController;
//
//  SearchResultsViewTVOSController *resultsVC = [[SearchResultsViewTVOSController alloc] initWithReactViewController:reactController];
//
//  UISearchController *searchController = [[UISearchController alloc] initWithSearchResultsController:resultsVC];
//
//  self.containerVC = [[UISearchContainerViewController alloc] initWithSearchController:searchController];
//
//  self.containerVC.tabBarItem = self.reactViewController.tabBarItem;
//
//  UITabBarController *tabBarVC = self.reactViewController.tabBarController;
//
//  NSMutableArray *viewControllers = tabBarVC.viewControllers.mutableCopy;
//
//  NSUInteger index = [tabBarVC.viewControllers indexOfObject:self.reactViewController];
//
//  [viewControllers replaceObjectAtIndex:index withObject:self.containerVC];
//
//  tabBarVC.viewControllers = viewControllers;
//
//  UIView *rootView = tabBarVC.view.window.rootViewController.view;
//  for (UIGestureRecognizer *recognizer in rootView.gestureRecognizers) {
//    if([recognizer.allowedPressTypes containsObject:@(UIPressTypeSelect)] && [recognizer isKindOfClass:[UITapGestureRecognizer class]]){
//      [recognizer.view removeGestureRecognizer:recognizer];
//    }
//  }
//
//}

@end
