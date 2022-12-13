//
//  RCTSearchViewTVOSManager.m
//  FocusPOC
//
//  Created by Godwin Vinny Carole Kati on 09/12/22.
//

#import <React/RCTViewManager.h>
#import <MapKit/MapKit.h>
#import "RCTSearchViewTVOS.h"

@interface RCTSearchViewTVOSManager : RCTViewManager

@end

@implementation RCTSearchViewTVOSManager

RCT_EXPORT_MODULE(SearchViewTVOS);

RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTBubblingEventBlock);

- (UIView *)view
{
  return [[RCTSearchViewTVOS alloc] init];
}
@end
